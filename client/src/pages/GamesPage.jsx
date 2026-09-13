import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Trophy, Zap, Clock, Star, Flame } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import { generateQuestion, generateCalculation } from '../utils/exerciseGenerator'
import soundManager from '../utils/soundManager'
import confetti from 'canvas-confetti'
import './GamesPage.css'

// Game Definitions
const GAME_LIST = [
  {
    id: 'math_race',
    title: '🏎️ Cuộc Đua Toán Học',
    subtitle: 'Math Race',
    description: 'Trả lời đúng các phép tính để xe của bé tăng tốc vượt qua Thỏ, Rùa và Mèo cán đích đầu tiên!',
    color: '#FF6B6B',
    icon: '🏎️',
    difficulty: 'Dễ - Vừa',
  },
  {
    id: 'number_pop',
    title: '🎯 Bắn Bóng Số Bay',
    subtitle: 'Number Pop',
    description: 'Các quả bóng bay mang số đang bay lên! Hãy chọn nhanh quả bóng có đáp án chính xác!',
    color: '#4facfe',
    icon: '🎈',
    difficulty: 'Nhanh tay',
  },
  {
    id: 'memory_match',
    title: '🃏 Lật Thẻ Trí Nhớ',
    subtitle: 'Memory Match',
    description: 'Lật mở các thẻ bài bí mật để ghép đôi phép tính với kết quả tương ứng!',
    color: '#51CF66',
    icon: '🃏',
    difficulty: 'Trí nhớ',
  },
  {
    id: 'math_balance',
    title: '⚖️ Cán Cân Thần Kỳ',
    subtitle: 'Math Balance',
    description: 'Chọn quả cân thích hợp đặt lên đĩa cân để cán cân thăng bằng hoàn hảo!',
    color: '#F59F00',
    icon: '⚖️',
    difficulty: 'Tư duy logic',
  },
  {
    id: 'space_defense',
    title: '🚀 Bắn Thiên Thạch Vũ Trụ',
    subtitle: 'Space Defense',
    description: 'Điều khiển pháo laser bắn tan các mảnh thiên thạch mang phép tính trước khi chạm lá chắn!',
    color: '#7950F2',
    icon: '🚀',
    difficulty: 'Phản xạ nhanh',
  },
  {
    id: 'math_fishing',
    title: '🎣 Hồ Câu Cá Thông Thái',
    subtitle: 'Math Fishing',
    description: 'Thả cần câu xuống làn nước trong xanh và câu chú cá mang đúng đáp án của phép tính!',
    color: '#20C997',
    icon: '🎣',
    difficulty: 'Khéo léo & Vui nhộn',
  },
]

export default function GamesPage() {
  const { grade, addCoins, addXp } = useUserStore()
  const { recordGamePlayed, recordRaceWin } = useProgressStore()
  const [activeGame, setActiveGame] = useState(null)

  return (
    <div className="games-container">
      {!activeGame ? (
        <div className="game-select-screen">
          <div className="games-hero">
            <h1>🎮 Khu Vui Chơi & Trò Chơi Toán Học</h1>
            <p>Vừa chơi vui nhộn vừa rèn luyện phản xạ tính nhẩm siêu tốc cùng các bạn thú cưng!</p>
          </div>

          <div className="game-cards-grid">
            {GAME_LIST.map((game) => (
              <motion.div
                key={game.id}
                className="game-card"
                whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveGame(game.id)
                  soundManager.playClick()
                }}
              >
                <div className="game-card-icon">{game.icon}</div>
                <div className="game-card-info">
                  <h2>{game.title}</h2>
                  <span className="game-badge">{game.difficulty}</span>
                  <p>{game.description}</p>
                </div>
                <Button variant="primary" size="md" className="game-play-btn">
                  Chơi ngay <Play size={18} fill="white" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      ) : activeGame === 'math_race' ? (
        <MathRaceGame
          onBack={() => setActiveGame(null)}
          grade={grade}
          addCoins={addCoins}
          addXp={addXp}
          recordRaceWin={recordRaceWin}
          recordGamePlayed={recordGamePlayed}
        />
      ) : activeGame === 'number_pop' ? (
        <NumberPopGame
          onBack={() => setActiveGame(null)}
          grade={grade}
          addCoins={addCoins}
          addXp={addXp}
          recordGamePlayed={recordGamePlayed}
        />
      ) : activeGame === 'memory_match' ? (
        <MemoryMatchGame
          onBack={() => setActiveGame(null)}
          grade={grade}
          addCoins={addCoins}
          addXp={addXp}
          recordGamePlayed={recordGamePlayed}
        />
      ) : activeGame === 'math_balance' ? (
        <MathBalanceGame
          onBack={() => setActiveGame(null)}
          grade={grade}
          addCoins={addCoins}
          addXp={addXp}
          recordGamePlayed={recordGamePlayed}
        />
      ) : activeGame === 'space_defense' ? (
        <SpaceDefenseGame
          onBack={() => setActiveGame(null)}
          grade={grade}
          addCoins={addCoins}
          addXp={addXp}
          recordGamePlayed={recordGamePlayed}
        />
      ) : activeGame === 'math_fishing' ? (
        <MathFishingGame
          onBack={() => setActiveGame(null)}
          grade={grade}
          addCoins={addCoins}
          addXp={addXp}
          recordGamePlayed={recordGamePlayed}
        />
      ) : null}
    </div>
  )
}

// ========================================================
// 🏅 RACE MEDAL COMPONENT (Ranks 1, 2, 3, 4)
// ========================================================
function RaceMedal({ rank }) {
  if (rank === 1) {
    return (
      <svg width="120" height="125" viewBox="0 0 120 125" className="race-medal-svg">
        <defs>
          <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E03131" />
            <stop offset="50%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#C92A2A" />
          </linearGradient>
          <linearGradient id="goldCoin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DB" />
            <stop offset="25%" stopColor="#FFD43B" />
            <stop offset="70%" stopColor="#FAB005" />
            <stop offset="100%" stopColor="#E67700" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(245, 159, 0, 0.45)" />
          </filter>
        </defs>
        <polygon points="36,0 48,0 32,50 20,50" fill="url(#goldRibbon)" />
        <polygon points="84,0 72,0 88,50 100,50" fill="url(#goldRibbon)" />
        <polygon points="60,0 52,0 48,50 56,50" fill="#FFE066" opacity="0.7" />
        <polygon points="60,0 68,0 72,50 64,50" fill="#FFE066" opacity="0.7" />
        <circle cx="60" cy="70" r="42" fill="#D97706" filter="url(#goldGlow)" />
        <circle cx="60" cy="70" r="38" fill="url(#goldCoin)" stroke="#FFE066" strokeWidth="2.5" />
        <circle cx="60" cy="70" r="30" fill="none" stroke="#F59F00" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M60 48 L62 53 L67 53 L63 56 L65 61 L60 58 L55 61 L57 56 L53 53 L58 53 Z" fill="#D97706" opacity="0.6" />
        <text x="60" y="84" textAnchor="middle" fontSize="34" fontWeight="900" fontFamily="var(--font-heading)" fill="#7F4F00">1</text>
        <text x="14" y="52" fontSize="18">✨</text>
        <text x="94" y="96" fontSize="18">✨</text>
      </svg>
    )
  }

  if (rank === 2) {
    return (
      <svg width="120" height="125" viewBox="0 0 120 125" className="race-medal-svg">
        <defs>
          <linearGradient id="silverRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1971C2" />
            <stop offset="50%" stopColor="#4DABF7" />
            <stop offset="100%" stopColor="#1864AB" />
          </linearGradient>
          <linearGradient id="silverCoin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F1F3F5" />
            <stop offset="75%" stopColor="#CED4DA" />
            <stop offset="100%" stopColor="#868E96" />
          </linearGradient>
          <filter id="silverGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(100, 116, 139, 0.35)" />
          </filter>
        </defs>
        <polygon points="36,0 48,0 32,50 20,50" fill="url(#silverRibbon)" />
        <polygon points="84,0 72,0 88,50 100,50" fill="url(#silverRibbon)" />
        <circle cx="60" cy="70" r="42" fill="#495057" filter="url(#silverGlow)" />
        <circle cx="60" cy="70" r="38" fill="url(#silverCoin)" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="60" cy="70" r="30" fill="none" stroke="#ADB5BD" strokeWidth="2" strokeDasharray="3 2" />
        <text x="60" y="84" textAnchor="middle" fontSize="34" fontWeight="900" fontFamily="var(--font-heading)" fill="#343A40">2</text>
        <text x="94" y="96" fontSize="16">⭐</text>
      </svg>
    )
  }

  if (rank === 3) {
    return (
      <svg width="120" height="125" viewBox="0 0 120 125" className="race-medal-svg">
        <defs>
          <linearGradient id="bronzeRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2B8A3E" />
            <stop offset="50%" stopColor="#51CF66" />
            <stop offset="100%" stopColor="#237032" />
          </linearGradient>
          <linearGradient id="bronzeCoin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="35%" stopColor="#FB923C" />
            <stop offset="75%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          <filter id="bronzeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(194, 65, 12, 0.35)" />
          </filter>
        </defs>
        <polygon points="36,0 48,0 32,50 20,50" fill="url(#bronzeRibbon)" />
        <polygon points="84,0 72,0 88,50 100,50" fill="url(#bronzeRibbon)" />
        <circle cx="60" cy="70" r="42" fill="#7C2D12" filter="url(#bronzeGlow)" />
        <circle cx="60" cy="70" r="38" fill="url(#bronzeCoin)" stroke="#FED7AA" strokeWidth="2.5" />
        <circle cx="60" cy="70" r="30" fill="none" stroke="#C2410C" strokeWidth="2" strokeDasharray="3 2" />
        <text x="60" y="84" textAnchor="middle" fontSize="34" fontWeight="900" fontFamily="var(--font-heading)" fill="#431407">3</text>
        <text x="94" y="96" fontSize="16">🥉</text>
      </svg>
    )
  }

  // Rank 4: Effort / Encouragement Medal
  return (
    <svg width="120" height="125" viewBox="0 0 120 125" className="race-medal-svg">
      <defs>
        <linearGradient id="effortRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7048E8" />
          <stop offset="50%" stopColor="#9775FA" />
          <stop offset="100%" stopColor="#5F3DC4" />
        </linearGradient>
        <linearGradient id="effortCoin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6FCF5" />
          <stop offset="35%" stopColor="#38D9A9" />
          <stop offset="75%" stopColor="#0CA678" />
          <stop offset="100%" stopColor="#087F5B" />
        </linearGradient>
        <filter id="effortGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(12, 166, 120, 0.35)" />
        </filter>
      </defs>
      <polygon points="36,0 48,0 32,50 20,50" fill="url(#effortRibbon)" />
      <polygon points="84,0 72,0 88,50 100,50" fill="url(#effortRibbon)" />
      <circle cx="60" cy="70" r="42" fill="#095C44" filter="url(#effortGlow)" />
      <circle cx="60" cy="70" r="38" fill="url(#effortCoin)" stroke="#C3FAE8" strokeWidth="2.5" />
      <circle cx="60" cy="70" r="30" fill="none" stroke="#099268" strokeWidth="2" strokeDasharray="3 2" />
      <text x="60" y="84" textAnchor="middle" fontSize="34" fontWeight="900" fontFamily="var(--font-heading)" fill="#044332">4</text>
      <text x="94" y="96" fontSize="16">🎖️</text>
    </svg>
  )
}

// Phân loại và định dạng câu hỏi thông minh cho Cuộc Đua Toán Học
function parseRaceQuestion(q) {
  if (!q) return { type: 'text_riddle', badge: '💡 Câu hỏi', content: '' }

  // 1. Có hình vẽ SVG hoặc biểu tượng đếm đồ vật
  if (q.visualDisplay) {
    return {
      type: 'visual',
      title: q.question,
      visual: q.visualDisplay,
    }
  }

  // 2. Câu hỏi phép tính có dấu hai chấm (VD: "Tính nhẩm: 7 + 8 = ?" hoặc "Điền dấu thích hợp: 14 ... 18")
  if (q.question.includes(':')) {
    const parts = q.question.split(':')
    const prompt = parts[0].trim() + ':'
    const equation = parts.slice(1).join(':').trim()
    return {
      type: 'calc',
      title: prompt,
      equation,
      icon: prompt.toLowerCase().includes('dấu') ? '⚖️' : '🧮',
    }
  }

  // 3. Phép tính nhẩm thuần túy không có dấu hai chấm (VD: "12 + 5 = ?" hoặc "15 - 7 = ?")
  const isMathExpr = /^[\d\s+\-×x*÷/:=.<>?a-zA-Z]+$/.test(q.question) && /[\d]/.test(q.question) && /[+\-×x*÷/:=.<>]/.test(q.question)
  if (isMathExpr && q.question.length <= 22) {
    return {
      type: 'calc',
      title: 'Tính nhẩm:',
      equation: q.question,
      icon: '🧮',
    }
  }

  // 4. Câu hỏi đố tư duy / đặc điểm hình học bằng lời (VD: "Hình nào dưới đây có 2 cạnh dài và 2 cạnh ngắn?")
  const isGeometry = q.question.toLowerCase().includes('hình') || q.question.toLowerCase().includes('cạnh') || q.question.toLowerCase().includes('góc')
  return {
    type: 'text_riddle',
    badge: isGeometry ? '🔷 Câu hỏi hình học' : '💡 Câu hỏi tư duy',
    content: q.question,
  }
}

// ========================================================
// 🏎️ GAME 1: MATH RACE
// ========================================================
function MathRaceGame({ onBack, grade, addCoins, addXp, recordRaceWin, recordGamePlayed }) {
  const { nickname } = useUserStore()
  const [playerPos, setPlayerPos] = useState(0) // 0 to 100%
  const [bot1Pos, setBot1Pos] = useState(0) // Rabbit
  const [bot2Pos, setBot2Pos] = useState(0) // Turtle
  const [bot3Pos, setBot3Pos] = useState(0) // Cat
  const [question, setQuestion] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [rank, setRank] = useState(1)
  const [score, setScore] = useState(0)
  const rewardClaimedRef = useRef(false)

  const FINISH_LINE = 100

  // Init question
  useEffect(() => {
    setQuestion(generateQuestion(grade))
  }, [grade])

  // Bot timer loop
  useEffect(() => {
    if (gameOver) return

    const timer = setInterval(() => {
      setBot1Pos((p) => Math.min(FINISH_LINE, p + Math.random() * 3.2))
      setBot2Pos((p) => Math.min(FINISH_LINE, p + Math.random() * 2.5))
      setBot3Pos((p) => Math.min(FINISH_LINE, p + Math.random() * 2.8))
    }, 800)

    return () => clearInterval(timer)
  }, [gameOver])

  // Check victory / finish
  useEffect(() => {
    if (gameOver || rewardClaimedRef.current) return

    if (playerPos >= FINISH_LINE) {
      rewardClaimedRef.current = true
      setGameOver(true)
      let r = 1
      if (bot1Pos >= FINISH_LINE) r++
      if (bot2Pos >= FINISH_LINE) r++
      if (bot3Pos >= FINISH_LINE) r++
      setRank(r)

      if (r === 1) {
        soundManager.playFanfare()
        confetti({ particleCount: 120, spread: 90 })
        if (typeof recordRaceWin === 'function') {
          recordRaceWin()
        } else if (typeof recordGamePlayed === 'function') {
          recordGamePlayed()
        }
      } else if (r <= 3) {
        soundManager.playCoin()
        confetti({ particleCount: 60, spread: 60 })
        if (typeof recordGamePlayed === 'function') {
          recordGamePlayed()
        }
      } else {
        soundManager.playWrong()
        if (typeof recordGamePlayed === 'function') {
          recordGamePlayed()
        }
      }
      const reward = r === 1 ? 50 : r === 2 ? 30 : r === 3 ? 20 : 10
      addCoins(reward)
      addXp(r === 1 ? 60 : r === 2 ? 40 : r === 3 ? 30 : 20)
    } else if (bot1Pos >= FINISH_LINE && bot2Pos >= FINISH_LINE && bot3Pos >= FINISH_LINE) {
      // All bots finished
      rewardClaimedRef.current = true
      setGameOver(true)
      setRank(4)
      soundManager.playWrong()
      if (typeof recordGamePlayed === 'function') {
        recordGamePlayed()
      }
      addCoins(10)
      addXp(20)
    }
  }, [playerPos, bot1Pos, bot2Pos, bot3Pos, gameOver, addCoins, addXp, recordRaceWin, recordGamePlayed])

  const handleAnswer = useCallback((option) => {
    if (feedback || gameOver) return

    const isCorrect = option === question?.answer
    if (isCorrect) {
      soundManager.playCorrect()
      setFeedback('correct')
      setPlayerPos((p) => Math.min(FINISH_LINE, p + 18))
      setScore((s) => s + 1)
    } else {
      soundManager.playWrong()
      setFeedback('wrong')
    }

    setTimeout(() => {
      setFeedback(null)
      setQuestion(generateQuestion(grade))
    }, 600)
  }, [feedback, gameOver, question, grade])

  const restart = useCallback(() => {
    rewardClaimedRef.current = false
    setPlayerPos(0)
    setBot1Pos(0)
    setBot2Pos(0)
    setBot3Pos(0)
    setScore(0)
    setGameOver(false)
    setFeedback(null)
    setQuestion(generateQuestion(grade))
    soundManager.playClick()
  }, [grade])

  return (
    <div className="mini-game-wrapper">
      {!gameOver && (
        <div className="game-top-bar">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Rời trò chơi</span>
          </button>
          <span className="game-title-text">🏎️ Cuộc Đua Toán Học</span>
          <span className="score-pill">Điểm: {score}</span>
        </div>
      )}

      {/* Racetrack */}
      <div className="race-track-board">
        {/* Player */}
        <div className="lane player-lane">
          <span className="lane-label">{nickname || 'Bé Yêu'}</span>
          <div className="track-bar">
            <motion.div
              className="racer racer-player"
              style={{ left: `calc(${playerPos}% - ${playerPos * 0.45}px)` }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <span className="car-emoji">🏎️</span>
            </motion.div>
          </div>
        </div>

        {/* Bot 1: Rabbit */}
        <div className="lane bot-lane">
          <span className="lane-label">Thỏ Hồng</span>
          <div className="track-bar">
            <div className="racer" style={{ left: `calc(${bot1Pos}% - ${bot1Pos * 0.45}px)` }}>
              🐰
            </div>
          </div>
        </div>

        {/* Bot 2: Turtle */}
        <div className="lane bot-lane">
          <span className="lane-label">Rùa Xanh</span>
          <div className="track-bar">
            <div className="racer" style={{ left: `calc(${bot2Pos}% - ${bot2Pos * 0.45}px)` }}>
              <span className="turtle-emoji">🐢</span>
            </div>
          </div>
        </div>

        {/* Bot 3: Cat */}
        <div className="lane bot-lane">
          <span className="lane-label">Mèo Vàng</span>
          <div className="track-bar">
            <div className="racer" style={{ left: `calc(${bot3Pos}% - ${bot3Pos * 0.45}px)` }}>
              🐱
            </div>
          </div>
        </div>

        <div className="finish-flag">🏁 ĐÍCH</div>
      </div>

      {/* Question or Game Over */}
      {!gameOver ? (
        question && (() => {
          const parsed = parseRaceQuestion(question)
          return (
            <div className="race-interaction-grid">
              {/* Cột Trái: Câu hỏi & Hình minh họa (Chiều cao & vị trí cố định) */}
              <div className="race-question-column">
                {parsed.type === 'text_riddle' ? (
                  <div className="race-text-riddle-card">
                    <span className="riddle-badge">{parsed.badge}</span>
                    <p className="riddle-content">{parsed.content}</p>
                  </div>
                ) : (
                  <>
                    <div className="race-q-header">
                      <h3 className="race-q-text">{parsed.title}</h3>
                    </div>

                    <div className="race-visual-box">
                      {parsed.type === 'visual' ? (
                        typeof parsed.visual === 'string' && parsed.visual.trim().split(/\s+/).length > 1 ? (
                          <div className="race-emoji-grid">
                            {parsed.visual.trim().split(/\s+/).map((item, idx) => (
                              <span key={idx} className="race-emoji-item">{item}</span>
                            ))}
                          </div>
                        ) : (
                          <div className="race-shape-wrapper">{parsed.visual}</div>
                        )
                      ) : (
                        <div className="race-calc-card">
                          <span className="race-calc-icon">{parsed.icon}</span>
                          <span className="race-calc-equation">{parsed.equation}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Cột Phải: Lưới 2x2 Cố Định Tuyệt Đối - Không Xê Dịch */}
              <div className="race-answers-column">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`race-opt-btn opt-pos-${i} ${
                      feedback === 'correct' && opt === question.answer
                        ? 'correct'
                        : feedback === 'wrong' && opt === question.answer
                        ? 'correct'
                        : ''
                    }`}
                    onClick={() => handleAnswer(opt)}
                  >
                    <span className="opt-letter-badge">{['A', 'B', 'C', 'D'][i]}</span>
                    <span className="opt-val-text">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })()
      ) : (
        <motion.div
          className="race-gameover-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="gameover-medal-container">
            <RaceMedal rank={rank} />
          </div>

          <div className={`race-rank-pill ${rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'effort'}`}>
            {rank === 1
              ? '🥇 HUY CHƯƠNG VÀNG - HẠNG 1'
              : rank === 2
              ? '🥈 HUY CHƯƠNG BẠC - HẠNG 2'
              : rank === 3
              ? '🥉 HUY CHƯƠNG ĐỒNG - HẠNG 3'
              : '🎖️ HUY HIỆU NỖ LỰC - HẠNG 4'}
          </div>

          <h2>
            {rank === 1
              ? '🏆 Vô Địch Cuộc Đua!'
              : rank === 2
              ? '🥈 Á Quân Cuộc Đua!'
              : rank === 3
              ? '🥉 Quý Quân Cuộc Đua!'
              : '🎖️ Về Đích Hạng 4!'}
          </h2>

          <p>
            {rank === 1
              ? `Xuất sắc! Bé đã cán đích đầu tiên và giải đúng ${score} câu hỏi!`
              : rank === 2
              ? `Tuyệt vời! Bé đã chạy đua rất cừ và giải đúng ${score} câu hỏi!`
              : rank === 3
              ? `Rất tốt! Bé đã nỗ lực hoàn thành chặng đua và giải đúng ${score} câu hỏi!`
              : `Bé đã rất kiên trì hoàn thành chặng đua và giải đúng ${score} câu hỏi! Cố lên nhé!`}
          </p>

          <div className="rank-rewards-box">
            <span className="reward-item">🪙 +{rank === 1 ? 50 : rank === 2 ? 30 : rank === 3 ? 20 : 10} Xu</span>
            <span className="reward-item">⭐ +{rank === 1 ? 60 : rank === 2 ? 40 : rank === 3 ? 30 : 20} XP</span>
          </div>

          <div className="gameover-btns">
            <Button variant="primary" size="lg" onClick={restart}>
              <RotateCcw size={18} /> Đua lại trận mới
            </Button>
            <Button variant="outline" size="lg" onClick={onBack}>
              Quay lại danh sách game
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ========================================================
// 🎯 GAME 2: NUMBER POP (BẮN BÓNG SỐ)
// ========================================================
function NumberPopGame({ onBack, grade, addCoins, addXp, recordGamePlayed }) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [currentQ, setCurrentQ] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [balloons, setBalloons] = useState([])
  const gameOverTriggeredRef = useRef(false)
  const gameRecordedRef = useRef(false)

  const BALLOON_COLORS = ['#ff6b6b', '#4facfe', '#51cf66', '#fcc419', '#cc5de8']

  const loadNewQuestion = useCallback(() => {
    const q = generateCalculation(grade)
    setCurrentQ(q)
    // Create balloon objects
    const newBalloons = q.options.map((val, idx) => ({
      id: `${val}-${Date.now()}-${idx}`,
      val,
      color: BALLOON_COLORS[idx % BALLOON_COLORS.length],
      isCorrect: val === q.answer,
    }))
    setBalloons(newBalloons)
  }, [grade])

  useEffect(() => {
    loadNewQuestion()
  }, [loadNewQuestion])

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!gameOverTriggeredRef.current) {
        gameOverTriggeredRef.current = true
        setGameOver(true)
        if (!gameRecordedRef.current) {
          gameRecordedRef.current = true
          if (typeof recordGamePlayed === 'function') {
            recordGamePlayed()
          }
        }
        if (score > 0) {
          soundManager.playFanfare()
          confetti({ particleCount: 80, spread: 70 })
          addCoins(score * 2)
          addXp(score * 5)
        } else {
          soundManager.playWrong()
        }
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, score, addCoins, addXp, recordGamePlayed])

  const handlePop = useCallback((balloon) => {
    if (gameOver) return

    if (balloon.isCorrect) {
      soundManager.playCoin()
      setScore((s) => s + 10)
      loadNewQuestion()
    } else {
      soundManager.playWrong()
      setScore((s) => Math.max(0, s - 5))
    }
  }, [gameOver, loadNewQuestion])

  const handleBack = () => {
    if (score > 0 && !gameRecordedRef.current) {
      gameRecordedRef.current = true
      if (typeof recordGamePlayed === 'function') {
        recordGamePlayed()
      }
    }
    onBack()
  }

  return (
    <div className="mini-game-wrapper">
      {!gameOver && (
        <div className="game-top-bar">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>Rời trò chơi</span>
          </button>
          <span className="game-title-text">🎯 Bắn Bóng Số Bay</span>
          <div className="game-stats-group">
            <span className="timer-pill">
              <Clock size={16} /> {timeLeft}s
            </span>
            <span className="score-pill">Điểm: {score}</span>
          </div>
        </div>
      )}

      {!gameOver ? (
        <div className="number-pop-stage">
          {currentQ && (
            <div className="pop-target-equation">
              <h3>Bắn bóng có kết quả của:</h3>
              <div className="equation-badge number">{currentQ.question}</div>
              {currentQ.visualDisplay && (
                <div className="pop-visual-display">{currentQ.visualDisplay}</div>
              )}
            </div>
          )}

          <div className="balloons-floating-area">
            {balloons.map((b) => (
              <motion.button
                key={b.id}
                className="balloon-btn"
                style={{ backgroundColor: b.color }}
                initial={{ y: 80, scale: 0.5, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePop(b)}
              >
                <span className="balloon-text number">{b.val}</span>
                <span className="balloon-knot"></span>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="race-gameover-card">
          <span className="gameover-trophy">{score > 0 ? '🎈' : '💪'}</span>
          <h2>{score > 0 ? 'Hết giờ rồi!' : 'Hết thời gian!'}</h2>
          {score > 0 ? (
            <p>
              Bé đã ghi được số điểm xuất sắc: <strong>{score} điểm</strong>! Nhận được{' '}
              <strong style={{ color: '#F59F00' }}>+{score * 2} Xu</strong> và{' '}
              <strong style={{ color: '#4DABF7' }}>+{score * 5} XP</strong>!
            </p>
          ) : (
            <p>
              Chưa ghi được điểm nào lần này. Cố lên nhé! Lần sau bé hãy bắn thật nhanh các quả bóng mang đáp án đúng nha!
            </p>
          )}
          <div className="gameover-btns">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                gameOverTriggeredRef.current = false
                gameRecordedRef.current = false
                setTimeLeft(45)
                setScore(0)
                setGameOver(false)
                loadNewQuestion()
                soundManager.playClick()
              }}
            >
              <RotateCcw size={18} /> Chơi ván mới
            </Button>
            <Button variant="outline" size="lg" onClick={handleBack}>
              Quay lại danh sách game
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ========================================================
// 🃏 GAME 3: MEMORY MATCH (LẬT THẺ TRÍ NHỚ)
// ========================================================
function MemoryMatchGame({ onBack, grade, addCoins, addXp, recordGamePlayed }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [turns, setTurns] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const gameRecordedRef = useRef(false)

  const initDeck = useCallback(() => {
    gameRecordedRef.current = false
    // Generate 4 unique math pairs
    const pairs = []
    const usedAnswers = new Set()
    const usedEquations = new Set()

    let attempts = 0
    while (pairs.length < 8 && attempts < 50) {
      attempts++
      const q = generateCalculation(grade)
      const equation = q.equation || q.question.replace('=', '').replace('?', '').trim()
      const answerStr = String(q.answer)

      if (!usedAnswers.has(answerStr) && !usedEquations.has(equation)) {
        usedAnswers.add(answerStr)
        usedEquations.add(equation)
        const pairId = pairs.length / 2
        pairs.push({
          pairId,
          content: equation,
          isEquation: true,
        })
        pairs.push({
          pairId,
          content: answerStr,
          isEquation: false,
        })
      }
    }

    // Shuffle deck
    const shuffled = pairs
      .map((item, idx) => ({ ...item, id: idx }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setTurns(0)
    setGameWon(false)
  }, [grade])

  useEffect(() => {
    initDeck()
  }, [initDeck])

  const handleCardClick = useCallback((card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.pairId)) return

    soundManager.playClick()
    const newFlipped = [...flipped, card.id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setTurns((t) => t + 1)
      const firstCard = cards.find((c) => c.id === newFlipped[0])
      const secondCard = card

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        soundManager.playCorrect()
        const newMatched = [...matched, firstCard.pairId]
        setMatched(newMatched)
        setFlipped([])

        if (newMatched.length === 4) {
          // Finished all pairs
          setGameWon(true)
          if (!gameRecordedRef.current) {
            gameRecordedRef.current = true
            if (typeof recordGamePlayed === 'function') {
              recordGamePlayed()
            }
          }
          soundManager.playFanfare()
          confetti({ particleCount: 90, spread: 70 })
          addCoins(35)
          addXp(50)
        }
      } else {
        // Not matched
        setTimeout(() => {
          soundManager.playWrong()
          setFlipped([])
        }, 1000)
      }
    }
  }, [flipped, matched, cards, addCoins, addXp, recordGamePlayed])

  const handleBack = () => {
    if (matched.length >= 2 && !gameRecordedRef.current) {
      gameRecordedRef.current = true
      if (typeof recordGamePlayed === 'function') {
        recordGamePlayed()
      }
    }
    onBack()
  }

  return (
    <div className="mini-game-wrapper">
      {!gameWon && (
        <div className="game-top-bar">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>Rời trò chơi</span>
          </button>
          <span className="game-title-text">🃏 Lật Thẻ Trí Nhớ</span>
          <span className="score-pill">Số lượt lật: {turns}</span>
        </div>
      )}

      {!gameWon ? (
        <div className="memory-board">
          <p className="memory-hint">Lật mở 2 thẻ bài có phép tính và kết quả giống nhau nhé!</p>
          <div className="memory-grid">
            {cards.map((card) => {
              const isCardFlipped = flipped.includes(card.id) || matched.includes(card.pairId)
              return (
                <motion.div
                  key={card.id}
                  className={`memory-card ${isCardFlipped ? 'flipped' : ''} ${
                    matched.includes(card.pairId) ? 'matched' : ''
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleCardClick(card)}
                >
                  <div className="card-inner">
                    <div className="card-front">❓</div>
                    <div className="card-back number">{card.content}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="race-gameover-card">
          <span className="gameover-trophy">🏆</span>
          <h2>Trí Nhớ Siêu Phàm!</h2>
          <p>Bé đã ghép đúng toàn bộ 4 cặp thẻ bài chỉ trong {turns} lượt lật!</p>
          <div className="gameover-btns">
            <Button variant="primary" size="lg" onClick={initDeck}>
              <RotateCcw size={18} /> Chơi ván khác
            </Button>
            <Button variant="outline" size="lg" onClick={handleBack}>
              Quay lại danh sách game
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ========================================================
// ⚖️ GAME 4: MATH BALANCE (CÁN CÂN THẦN KỲ)
// ========================================================
function MathBalanceGame({ onBack, grade = 1, addCoins, addXp, recordGamePlayed }) {
  const [round, setRound] = useState(1)
  const [puzzle, setPuzzle] = useState(null)
  const [selectedWeight, setSelectedWeight] = useState(null)
  const [isBalanced, setIsBalanced] = useState(false)
  const [score, setScore] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [wrongOption, setWrongOption] = useState(null)

  const TOTAL_ROUNDS = 8
  const gameRecordedRef = useRef(false)

  const generatePuzzle = useCallback(() => {
    let target, leftExpr, rightExisting, missing
    if (grade === 1) {
      target = Math.floor(Math.random() * 9) + 6 // 6 to 14
      const splitA = Math.floor(Math.random() * (target - 2)) + 1
      const splitB = target - splitA
      leftExpr = Math.random() > 0.5 ? `${splitA} + ${splitB}` : `${target} kg`
      rightExisting = Math.floor(Math.random() * (target - 2)) + 1
      missing = target - rightExisting
    } else if (grade === 2) {
      target = Math.floor(Math.random() * 30) + 16 // 16 to 45
      const splitA = Math.floor(Math.random() * (target - 8)) + 4
      const splitB = target - splitA
      leftExpr = Math.random() > 0.5 ? `${splitA} + ${splitB}` : `${target} kg`
      rightExisting = Math.floor(Math.random() * (target - 6)) + 3
      missing = target - rightExisting
    } else {
      const isMul = Math.random() > 0.4
      if (isMul) {
        const a = Math.floor(Math.random() * 6) + 4
        const b = Math.floor(Math.random() * 6) + 3
        target = a * b
        leftExpr = `${a} × ${b}`
      } else {
        target = Math.floor(Math.random() * 50) + 35
        const a = Math.floor(Math.random() * (target - 15)) + 10
        leftExpr = `${a} + ${target - a}`
      }
      rightExisting = Math.floor(Math.random() * (target - 8)) + 5
      missing = target - rightExisting
    }

    const optSet = new Set([missing])
    while (optSet.size < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1)
      const cand = missing + delta
      if (cand > 0 && cand !== missing) {
        optSet.add(cand)
      }
    }
    const options = Array.from(optSet).sort(() => Math.random() - 0.5)

    setPuzzle({ target, leftExpr, rightExisting, missing, options })
    setSelectedWeight(null)
    setIsBalanced(false)
    setWrongOption(null)
  }, [grade])

  useEffect(() => {
    generatePuzzle()
  }, [generatePuzzle])

  const handleSelectOption = (weight) => {
    if (isBalanced || !puzzle) return

    if (weight === puzzle.missing) {
      setSelectedWeight(weight)
      setIsBalanced(true)
      soundManager.playCoin()
      confetti({ particleCount: 30, spread: 50 })
      setScore((s) => s + 10)
      addCoins(2)
      addXp(6)

      setTimeout(() => {
        if (round >= TOTAL_ROUNDS) {
          setGameWon(true)
          soundManager.playFanfare()
          confetti({ particleCount: 90, spread: 80 })
          addCoins(15)
          addXp(40)
          if (!gameRecordedRef.current) {
            gameRecordedRef.current = true
            if (typeof recordGamePlayed === 'function') {
              recordGamePlayed()
            }
          }
        } else {
          setRound((r) => r + 1)
          generatePuzzle()
        }
      }, 1200)
    } else {
      soundManager.playWrong()
      setWrongOption(weight)
      setTimeout(() => setWrongOption(null), 800)
    }
  }

  const handleBack = () => {
    if (score > 0 && !gameRecordedRef.current) {
      gameRecordedRef.current = true
      if (typeof recordGamePlayed === 'function') {
        recordGamePlayed()
      }
    }
    onBack()
  }

  const handleRestart = () => {
    setRound(1)
    setScore(0)
    setGameWon(false)
    generatePuzzle()
  }

  return (
    <div className="mini-game-wrapper">
      {!gameWon && (
        <div className="game-top-bar">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>Rời trò chơi</span>
          </button>
          <span className="game-title-text">⚖️ Cán Cân Thần Kỳ</span>
          <div className="game-stats-pills">
            <span className="score-pill">Vòng: {round}/{TOTAL_ROUNDS}</span>
            <span className="score-pill highlight">Điểm: {score}</span>
          </div>
        </div>
      )}

      {!gameWon ? (
        <div className="balance-board">
          <p className="balance-hint">
            ⚖️ Chọn quả cân thích hợp đặt vào đĩa bên phải để cán cân thăng bằng nhé!
          </p>

          <div className="balance-scale-stage">
            <div className="balance-stand">
              <div className="balance-pivot" />
              <div
                className="balance-beam"
                style={{
                  transform: `rotate(${isBalanced ? 0 : -8}deg)`,
                }}
              >
                {/* Left Pan */}
                <div
                  className="balance-pan-hanger left"
                  style={{
                    transform: `rotate(${isBalanced ? 0 : 8}deg)`,
                  }}
                >
                  <div className="pan-chain" />
                  <div className="pan-plate">
                    <div className="pan-weight-stone left-stone">
                      <span className="weight-stone-icon">🏋️</span>
                      <span className="weight-stone-val">{puzzle?.leftExpr}</span>
                    </div>
                  </div>
                </div>

                {/* Right Pan */}
                <div
                  className="balance-pan-hanger right"
                  style={{
                    transform: `rotate(${isBalanced ? 0 : 8}deg)`,
                  }}
                >
                  <div className="pan-chain" />
                  <div className="pan-plate">
                    <div className="pan-weights-group">
                      <div className="pan-weight-stone">
                        <span className="weight-stone-icon">⚖️</span>
                        <span className="weight-stone-val">{puzzle?.rightExisting} kg</span>
                      </div>
                      <span className="pan-plus-sign">+</span>
                      <div className={`pan-weight-stone target-slot ${isBalanced ? 'filled' : 'empty'}`}>
                        {isBalanced ? (
                          <span className="weight-stone-val">{selectedWeight} kg</span>
                        ) : (
                          <span className="weight-stone-question">?</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="balance-base" />
            </div>
          </div>

          {/* Options Grid */}
          <div className="balance-options-grid">
            {puzzle?.options.map((opt) => (
              <motion.button
                key={opt}
                type="button"
                className={`balance-option-btn ${wrongOption === opt ? 'wrong' : ''} ${
                  isBalanced && selectedWeight === opt ? 'correct' : ''
                }`}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSelectOption(opt)}
                disabled={isBalanced}
              >
                <span className="btn-weight-icon">🪨</span>
                <span className="btn-weight-number">{opt} kg</span>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="race-gameover-card">
          <span className="gameover-trophy">🏆</span>
          <h2>Thần Kì Thăng Bằng!</h2>
          <p>Bé đã xuất sắc cân bằng toàn bộ {TOTAL_ROUNDS} đĩa cân thần kỳ và ghi được {score} điểm!</p>
          <div className="gameover-btns">
            <Button variant="primary" size="lg" onClick={handleRestart}>
              <RotateCcw size={18} /> Chơi ván khác
            </Button>
            <Button variant="outline" size="lg" onClick={handleBack}>
              Quay lại danh sách game
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ========================================================
// 🚀 GAME 5: SPACE DEFENSE (BẮN THIÊN THẠCH VŨ TRỤ)
// ========================================================
function SpaceDefenseGame({ onBack, grade = 1, addCoins, addXp, recordGamePlayed }) {
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [maxCombo, setMaxCombo] = useState(1)
  const [shieldHp, setShieldHp] = useState(3)
  const [timeLeft, setTimeLeft] = useState(45)
  const [currentQ, setCurrentQ] = useState(null)
  const [laserActive, setLaserActive] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [destroyedCount, setDestroyedCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [wrongOption, setWrongOption] = useState(null)

  const gameRecordedRef = useRef(false)
  const gameOverTriggeredRef = useRef(false)

  const loadNewAsteroid = useCallback(() => {
    const q = generateCalculation(grade)
    setCurrentQ(q)
    setLaserActive(false)
    setIsExploding(false)
    setWrongOption(null)
  }, [grade])

  useEffect(() => {
    loadNewAsteroid()
  }, [loadNewAsteroid])

  useEffect(() => {
    if (timeLeft <= 0 || shieldHp <= 0) {
      if (!gameOverTriggeredRef.current) {
        gameOverTriggeredRef.current = true
        setGameOver(true)
        if (!gameRecordedRef.current) {
          gameRecordedRef.current = true
          if (typeof recordGamePlayed === 'function') {
            recordGamePlayed()
          }
        }
        if (score > 0) {
          soundManager.playFanfare()
          confetti({ particleCount: 80, spread: 70 })
          addCoins(Math.max(5, Math.floor(score / 4)))
          addXp(Math.max(10, Math.floor(score / 2)))
        } else {
          soundManager.playWrong()
        }
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, shieldHp, score, addCoins, addXp, recordGamePlayed])

  const handleShoot = (ans) => {
    if (gameOver || !currentQ || isExploding) return

    if (ans === currentQ.answer) {
      setLaserActive(true)
      soundManager.playCorrect()
      setTimeout(() => {
        setIsExploding(true)
        setScore((s) => s + 10 * combo)
        setCombo((c) => {
          const next = c + 1
          setMaxCombo((m) => Math.max(m, next))
          return next
        })
        setDestroyedCount((d) => d + 1)
        addCoins(1)
        addXp(3)
        setTimeout(() => {
          loadNewAsteroid()
        }, 500)
      }, 150)
    } else {
      soundManager.playWrong()
      setCombo(1)
      setWrongOption(ans)
      setShieldHp((hp) => Math.max(0, hp - 1))
      setTimeout(() => setWrongOption(null), 800)
    }
  }

  const handleBack = () => {
    if (score > 0 && !gameRecordedRef.current) {
      gameRecordedRef.current = true
      if (typeof recordGamePlayed === 'function') {
        recordGamePlayed()
      }
    }
    onBack()
  }

  const handleRestart = () => {
    setScore(0)
    setCombo(1)
    setMaxCombo(1)
    setShieldHp(3)
    setTimeLeft(45)
    setDestroyedCount(0)
    setGameOver(false)
    gameOverTriggeredRef.current = false
    loadNewAsteroid()
  }

  return (
    <div className="mini-game-wrapper space-theme-wrapper">
      {!gameOver && (
        <div className="game-top-bar space-top-bar">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>Rời trò chơi</span>
          </button>
          <span className="game-title-text">🚀 Bắn Thiên Thạch Vũ Trụ</span>
          <div className="game-stats-pills">
            <span className="score-pill">⏱️ {timeLeft}s</span>
            <span className="score-pill combo-pill">🔥 x{combo}</span>
            <span className="score-pill highlight">Điểm: {score}</span>
          </div>
        </div>
      )}

      {!gameOver ? (
        <div className="space-board">
          <div className="space-arena">
            <div className="space-stars-layer" />

            {/* Shield Status */}
            <div className="space-shield-header">
              <span className="shield-label">Lá chắn trạm vũ trụ:</span>
              <div className="shield-hearts">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <span key={idx} className={`shield-heart ${idx < shieldHp ? 'alive' : 'dead'}`}>
                    {idx < shieldHp ? '❤️' : '🖤'}
                  </span>
                ))}
              </div>
            </div>

            {/* Asteroid */}
            {currentQ && (
              <motion.div
                key={currentQ.question}
                className={`space-asteroid ${isExploding ? 'exploding' : ''}`}
                initial={{ scale: 0.6, y: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isExploding ? (
                  <div className="asteroid-explosion">💥✨</div>
                ) : (
                  <div className="asteroid-body">
                    <span className="asteroid-emoji">☄️</span>
                    <span className="asteroid-equation number">{currentQ.equation} = ?</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Laser Beam Animation */}
            {laserActive && <div className="space-laser-beam" />}

            {/* Spaceship */}
            <div className="space-ship-container">
              <div className="space-turret">⚡</div>
              <div className="space-ship-body">🛸</div>
            </div>
          </div>

          {/* Laser Control Panel */}
          <div className="space-control-panel">
            <p className="space-control-hint">Bấm mã số laser để bắn hạ thiên thạch:</p>
            <div className="space-weapons-grid">
              {currentQ?.options.map((opt) => (
                <motion.button
                  key={opt}
                  type="button"
                  className={`space-weapon-btn ${wrongOption === opt ? 'wrong' : ''}`}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleShoot(opt)}
                  disabled={isExploding}
                >
                  <span className="weapon-laser-icon">⚡</span>
                  <span className="weapon-val number">{opt}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="race-gameover-card">
          <span className="gameover-trophy">🚀</span>
          <h2>Hoàn Thành Nhiệm Vụ Vũ Trụ!</h2>
          <p>
            Bé đã bắn tan {destroyedCount} mảnh thiên thạch, đạt Combo cao nhất x{maxCombo} và ghi được {score} điểm!
          </p>
          <div className="gameover-btns">
            <Button variant="primary" size="lg" onClick={handleRestart}>
              <RotateCcw size={18} /> Chơi ván khác
            </Button>
            <Button variant="outline" size="lg" onClick={handleBack}>
              Quay lại danh sách game
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ========================================================
// 🎣 GAME 6: MATH FISHING (HỒ CÂU CÁ THÔNG THÁI)
// ========================================================
function MathFishingGame({ onBack, grade = 1, addCoins, addXp, recordGamePlayed }) {
  const [caughtCount, setCaughtCount] = useState(0)
  const [score, setScore] = useState(0)
  const [currentQ, setCurrentQ] = useState(null)
  const [fishes, setFishes] = useState([])
  const [hookingFishId, setHookingFishId] = useState(null)
  const [hookSuccess, setHookSuccess] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [fishBucket, setFishBucket] = useState([])
  const [missedFishId, setMissedFishId] = useState(null)

  const TARGET_FISH = 6
  const gameRecordedRef = useRef(false)
  const FISH_EMOJIS = ['🐠', '🐟', '🐡', '🐙']

  const loadNewQuestion = useCallback(() => {
    const q = generateCalculation(grade)
    setCurrentQ(q)
    // Create 4 swimming fishes with distinct depths & speeds
    const newFishes = q.options.map((val, idx) => ({
      id: `${val}-${Date.now()}-${idx}`,
      val,
      emoji: FISH_EMOJIS[idx % FISH_EMOJIS.length],
      isCorrect: val === q.answer,
      yPercent: 12 + idx * 22,
      duration: 10 + (idx % 3) * 3,
      direction: idx % 2 === 0 ? 1 : -1,
    }))
    setFishes(newFishes)
    setHookingFishId(null)
    setHookSuccess(false)
    setMissedFishId(null)
  }, [grade])

  useEffect(() => {
    loadNewQuestion()
  }, [loadNewQuestion])

  const handleCatchFish = (fish) => {
    if (hookingFishId || gameWon) return

    setHookingFishId(fish.id)

    if (fish.isCorrect) {
      setHookSuccess(true)
      soundManager.playCoin()
      confetti({ particleCount: 35, spread: 60 })
      setScore((s) => s + 15)
      setFishBucket((b) => [...b, fish.emoji])
      const nextCaught = caughtCount + 1
      setCaughtCount(nextCaught)
      addCoins(3)
      addXp(8)

      setTimeout(() => {
        if (nextCaught >= TARGET_FISH) {
          setGameWon(true)
          soundManager.playFanfare()
          confetti({ particleCount: 90, spread: 80 })
          addCoins(20)
          addXp(50)
          if (!gameRecordedRef.current) {
            gameRecordedRef.current = true
            if (typeof recordGamePlayed === 'function') {
              recordGamePlayed()
            }
          }
        } else {
          loadNewQuestion()
        }
      }, 1000)
    } else {
      soundManager.playWrong()
      setMissedFishId(fish.id)
      setTimeout(() => {
        setHookingFishId(null)
        setMissedFishId(null)
      }, 800)
    }
  }

  const handleBack = () => {
    if (caughtCount > 0 && !gameRecordedRef.current) {
      gameRecordedRef.current = true
      if (typeof recordGamePlayed === 'function') {
        recordGamePlayed()
      }
    }
    onBack()
  }

  const handleRestart = () => {
    setCaughtCount(0)
    setScore(0)
    setFishBucket([])
    setGameWon(false)
    loadNewQuestion()
  }

  return (
    <div className="mini-game-wrapper pond-theme-wrapper">
      {!gameWon && (
        <div className="game-top-bar pond-top-bar">
          <button className="btn-back" onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>Rời trò chơi</span>
          </button>
          <span className="game-title-text">🎣 Hồ Câu Cá Thông Thái</span>
          <div className="game-stats-pills">
            <span className="score-pill">🪣 {caughtCount}/{TARGET_FISH} cá</span>
            <span className="score-pill highlight">Điểm: {score}</span>
          </div>
        </div>
      )}

      {!gameWon ? (
        <div className="pond-board">
          <div className="pond-question-banner">
            <span className="pond-rod-icon">🎣</span>
            <span className="pond-question-text">
              Bé hãy câu chú cá mang số: <strong className="number">{currentQ?.equation} = ?</strong>
            </span>
          </div>

          <div className="pond-water-stage">
            <div className="pond-bubbles-bg" />

            {/* Swimming Fishes */}
            {fishes.map((fish) => {
              const isHooked = hookingFishId === fish.id
              const isMissed = missedFishId === fish.id
              return (
                <div
                  key={fish.id}
                  className={`pond-fish-track ${fish.direction === 1 ? 'ltr' : 'rtl'}`}
                  style={{
                    top: `${fish.yPercent}%`,
                    animationDuration: `${fish.duration}s`,
                  }}
                >
                  <motion.div
                    className={`pond-fish-item ${isHooked ? (hookSuccess ? 'caught' : '') : ''} ${
                      isMissed ? 'missed' : ''
                    }`}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCatchFish(fish)}
                  >
                    <span className="fish-emoji">{fish.emoji}</span>
                    <span className="fish-badge number">{fish.val}</span>
                  </motion.div>
                </div>
              )
            })}

            {/* Seaweed Decor */}
            <div className="pond-seaweed-row">
              <span>🌿</span>
              <span>🪸</span>
              <span>🫧</span>
              <span>🌿</span>
              <span>🪸</span>
              <span>🫧</span>
              <span>🌿</span>
            </div>
          </div>

          {/* Fish Bucket Bar */}
          <div className="pond-bucket-bar">
            <span className="bucket-title">🪣 Giỏ cá của bé:</span>
            <div className="bucket-slots">
              {Array.from({ length: TARGET_FISH }).map((_, idx) => (
                <span key={idx} className={`bucket-slot ${idx < fishBucket.length ? 'filled' : 'empty'}`}>
                  {idx < fishBucket.length ? fishBucket[idx] : '⚪'}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="race-gameover-card">
          <span className="gameover-trophy">🎣</span>
          <h2>Vua Câu Cá Thông Thái!</h2>
          <p>Bé đã câu đầy giỏ {TARGET_FISH} chú cá thông thái và đạt được {score} điểm xuất sắc!</p>
          <div className="gameover-btns">
            <Button variant="primary" size="lg" onClick={handleRestart}>
              <RotateCcw size={18} /> Chơi ván khác
            </Button>
            <Button variant="outline" size="lg" onClick={handleBack}>
              Quay lại danh sách game
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
