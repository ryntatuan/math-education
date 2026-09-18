import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Lightbulb,
  Sparkles,
  HelpCircle,
  Heart,
  ArrowRight,
  X,
  BookOpen,
  RefreshCw,
  Coins,
} from 'lucide-react'
import MascotIcon from '../common/MascotIcon'
import CoinIcon from '../common/CoinIcon'
import useUserStore from '../../store/useUserStore'
import useAuthStore from '../../store/useAuthStore'
import soundManager from '../../utils/soundManager'
import './MascotBubble.css'

const moods = {
  happy: { expression: '😊' },
  excited: { expression: '🤩' },
  proud: { expression: '😎' },
  curious: { expression: '🤔' },
  encourage: { expression: '💪' },
  celebrate: { expression: '🎉' },
  sad: { expression: '😢' },
  thinking: { expression: '🧐' },
  hint: { expression: '💡' },
}

// Math tips database
const MATH_TIPS = [
  {
    title: 'Mẹo Cộng 9 Cực Nhanh 🧠',
    desc: 'Bé hãy cộng với 10 rồi bớt đi 1 đơn vị nhé! Ví dụ: 7 + 9 = (7 + 10) - 1 = 16.',
  },
  {
    title: 'Mẹo Trừ 9 Dễ Dàng ⚡',
    desc: 'Lấy số đó trừ đi 10 rồi cộng thêm 1. Ví dụ: 15 - 9 = (15 - 10) + 1 = 6.',
  },
  {
    title: 'Bí Mật Bảng Nhân 5 ✋',
    desc: 'Mọi kết quả trong bảng nhân 5 đều có số tận cùng là 0 hoặc 5: 5, 10, 15, 20, 25...',
  },
  {
    title: 'Cộng Số Tròn Chục Siêu Dễ 🎯',
    desc: 'Khi tính 30 + 40, bé chỉ cần nhẩm 3 + 4 = 7 rồi thêm số 0 ở sau thành 70!',
  },
  {
    title: 'Nhân 4 Bằng Cách Gấp Đôi 💡',
    desc: 'Muốn nhân một số với 4, bé chỉ cần gấp đôi 2 lần. Ví dụ: 6 × 4 -> 6 gấp đôi là 12, 12 gấp đôi là 24!',
  },
  {
    title: 'Chia 4 Bằng Cách Chia Đôi ✂️',
    desc: 'Muốn chia cho 4, bé chỉ cần chia 2 hai lần. Ví dụ: 28 : 4 -> 28 chia đôi là 14, 14 chia đôi là 7!',
  },
  {
    title: 'Mẹo Bàn Tay Bảng Nhân 9 👐',
    desc: 'Xòe 10 ngón tay, gập ngón thứ N cần nhân: các ngón bên trái là hàng chục, bên phải là hàng đơn vị!',
  },
]

// Motivational quotes
const MOTIVATIONAL_QUOTES = [
  'Toán học như một trò chơi xếp hình, mỗi bài giải là một chiến thắng rực rỡ! 🧩✨',
  'Bé rất thông minh và chăm chỉ! Cú Mèo rất tự hào về bé! 🦉❤️',
  'Sai một bài không sao cả, sai là cơ hội để mình khám phá thêm điều thú vị! 🌈',
  'Mỗi ngày dành 10 phút luyện toán, não bé sẽ khỏe mạnh như siêu nhân! 🚀💪',
  'Cố lên trạng nguyên toán học nhí! Tương lai tươi sáng đang chờ đón bé! 🌟',
  'Đọc kỹ đề bài, suy nghĩ bình tĩnh là chìa khóa giải mọi bài toán! 🔑',
]

// Quiz generator based on grade
function generateMiniQuiz(grade) {
  if (grade === 1) {
    const isAdd = Math.random() > 0.4
    if (isAdd) {
      const a = Math.floor(Math.random() * 6) + 1
      const b = Math.floor(Math.random() * (10 - a)) + 1
      const ans = a + b
      const wrong1 = ans > 1 ? ans - 1 : ans + 2
      const wrong2 = ans + 1
      return {
        question: `${a} + ${b} = ?`,
        options: [ans, wrong1, wrong2].sort(() => Math.random() - 0.5),
        correct: ans,
      }
    } else {
      const a = Math.floor(Math.random() * 6) + 5
      const b = Math.floor(Math.random() * 4) + 1
      const ans = a - b
      const wrong1 = ans + 1
      const wrong2 = ans > 1 ? ans - 1 : ans + 2
      return {
        question: `${a} - ${b} = ?`,
        options: [ans, wrong1, wrong2].sort(() => Math.random() - 0.5),
        correct: ans,
      }
    }
  } else if (grade === 2) {
    const isMult = Math.random() > 0.5
    if (isMult) {
      const a = [2, 3, 4, 5][Math.floor(Math.random() * 4)]
      const b = Math.floor(Math.random() * 8) + 2
      const ans = a * b
      const wrong1 = ans + a
      const wrong2 = ans - a > 0 ? ans - a : ans + 2
      return {
        question: `${a} × ${b} = ?`,
        options: [ans, wrong1, wrong2].sort(() => Math.random() - 0.5),
        correct: ans,
      }
    } else {
      const a = Math.floor(Math.random() * 30) + 20
      const b = Math.floor(Math.random() * 20) + 10
      const ans = a + b
      return {
        question: `${a} + ${b} = ?`,
        options: [ans, ans + 2, ans - 10].sort(() => Math.random() - 0.5),
        correct: ans,
      }
    }
  } else {
    // Grade 3
    const isMult = Math.random() > 0.5
    if (isMult) {
      const a = [6, 7, 8, 9][Math.floor(Math.random() * 4)]
      const b = Math.floor(Math.random() * 7) + 3
      const ans = a * b
      return {
        question: `${a} × ${b} = ?`,
        options: [ans, ans + 6, ans - 4].sort(() => Math.random() - 0.5),
        correct: ans,
      }
    } else {
      const b = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)]
      const ans = Math.floor(Math.random() * 8) + 2
      const a = b * ans
      return {
        question: `${a} : ${b} = ?`,
        options: [ans, ans + 1, ans > 2 ? ans - 1 : ans + 3].sort(() => Math.random() - 0.5),
        correct: ans,
      }
    }
  }
}

export default function MascotBubble({
  text,
  mood = 'happy',
  show = true,
  position = 'bottom-right',
  size = 'md',
  onClose,
  className = '',
  interactive = undefined,
}) {
  const isInteractive = interactive !== undefined ? interactive : position !== 'inline'
  const navigate = useNavigate()
  const { grade, coins, addCoins } = useUserStore()
  const { isGuest } = useAuthStore()

  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('quiz') // 'quiz' | 'tips' | 'cheer'
  const [currentMood, setCurrentMood] = useState(mood)

  // Mini quiz state
  const [quiz, setQuiz] = useState(() => generateMiniQuiz(grade || 1))
  const [quizStatus, setQuizStatus] = useState('idle') // 'idle' | 'correct' | 'wrong'
  const [selectedOption, setSelectedOption] = useState(null)

  // Math tips index
  const [tipIndex, setTipIndex] = useState(0)

  // Cheer quote index
  const [quoteIndex, setQuoteIndex] = useState(0)

  const moodData = moods[currentMood] || moods[mood] || moods.happy

  const handleToggleMascot = () => {
    if (!isInteractive) return
    const nextState = !isOpen
    setIsOpen(nextState)
    if (nextState) {
      setCurrentMood('excited')
      // Refresh quiz on open
      setQuiz(generateMiniQuiz(grade || 1))
      setQuizStatus('idle')
      setSelectedOption(null)
    } else {
      setCurrentMood(mood)
    }
  }

  const handleAnswerQuiz = (option) => {
    if (document.activeElement?.blur) document.activeElement.blur()
    if (quizStatus !== 'idle') return
    setSelectedOption(option)

    if (option === quiz.correct) {
      setQuizStatus('correct')
      setCurrentMood('celebrate')
      soundManager.playCorrect()
      if (!isGuest) {
        addCoins(5)
      }
    } else {
      setQuizStatus('wrong')
      setCurrentMood('encourage')
      soundManager.playWrong()
    }
  }

  const handleNextQuiz = () => {
    if (document.activeElement?.blur) document.activeElement.blur()
    setQuiz(generateMiniQuiz(grade || 1))
    setQuizStatus('idle')
    setSelectedOption(null)
    setCurrentMood('thinking')
  }

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % MATH_TIPS.length)
    setCurrentMood('hint')
  }

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length)
    setCurrentMood('happy')
  }

  const handleGoToLearn = () => {
    setIsOpen(false)
    navigate('/')
  }

  return (
    <AnimatePresence>
      {show && (
        <div className={`mascot-container mascot-${position} mascot-${size} ${className}`}>
          {/* INTERACTIVE MASCOT PANEL */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mascot-assistant-panel"
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              >
                {/* Panel Header */}
                <div className="mascot-panel-header">
                  <div className="mascot-panel-title">
                    <span className="mascot-avatar-small">
                      <MascotIcon size={28} />
                    </span>
                    <div>
                      <h4>Cú Mèo Thông Thái</h4>
                      {!isGuest && (
                        <span className="mascot-coins-badge">
                          <CoinIcon size={14} /> {coins} xu
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className="mascot-panel-close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Đóng"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Sub-tabs */}
                <div className="mascot-panel-nav">
                  <button
                    className={`nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('quiz')
                      soundManager.playClick()
                    }}
                  >
                    🎲 Đố Vui{!isGuest ? ' (+5 xu)' : ''}
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'tips' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('tips')
                      soundManager.playClick()
                    }}
                  >
                    💡 Mẹo Hay
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'cheer' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('cheer')
                      soundManager.playClick()
                    }}
                  >
                    💬 Động Viên
                  </button>
                </div>

                {/* Panel Body */}
                <div className="mascot-panel-body">
                  {/* TAB 1: MINI QUIZ */}
                  {activeTab === 'quiz' && (
                    <div className="mascot-quiz-section">
                      <span className="quiz-tag">Thử thách tính nhẩm lớp {grade || 1}:</span>
                      <div className="quiz-question-box">
                        <span className="quiz-question-text">{quiz.question}</span>
                      </div>

                      <div className="quiz-options-grid">
                        {quiz.options.map((opt, idx) => {
                          let btnClass = 'quiz-opt-btn'
                          if (quizStatus !== 'idle') {
                            if (opt === quiz.correct) btnClass += ' is-correct'
                            else if (opt === selectedOption) btnClass += ' is-wrong'
                          }

                          return (
                            <button
                              key={idx}
                              className={btnClass}
                              onClick={() => handleAnswerQuiz(opt)}
                              disabled={quizStatus !== 'idle'}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>

                      {/* Result feedback */}
                      {quizStatus === 'correct' && (
                        <div className="quiz-feedback correct">
                          <span>
                            {isGuest ? (
                              '🎉 Tuyệt vời! Bé đã trả lời rất chính xác!'
                            ) : (
                              <>
                                🎉 Tuyệt vời! Bé nhận ngay <strong>+5 xu</strong>{' '}
                                <CoinIcon size={16} />!
                              </>
                            )}
                          </span>
                          <button className="next-quiz-btn" onClick={handleNextQuiz}>
                            <span>Câu tiếp theo</span>
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      )}

                      {quizStatus === 'wrong' && (
                        <div className="quiz-feedback wrong">
                          <span>
                            💪 Chưa đúng rồi! Đáp án đúng là <strong>{quiz.correct}</strong>.
                          </span>
                          <button className="next-quiz-btn" onClick={handleNextQuiz}>
                            <span>Thử câu khác</span>
                            <RefreshCw size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: MATH TIPS */}
                  {activeTab === 'tips' && (
                    <div className="mascot-tips-section">
                      <div className="tip-card-box">
                        <h5>{MATH_TIPS[tipIndex].title}</h5>
                        <p>{MATH_TIPS[tipIndex].desc}</p>
                      </div>
                      <button className="action-cycle-btn" onClick={handleNextTip}>
                        <RefreshCw size={14} /> Mẹo tiếp theo
                      </button>
                    </div>
                  )}

                  {/* TAB 3: CHEER / MOTIVATION */}
                  {activeTab === 'cheer' && (
                    <div className="mascot-cheer-section">
                      <div className="cheer-card-box">
                        <p>"{MOTIVATIONAL_QUOTES[quoteIndex]}"</p>
                      </div>
                      <button className="action-cycle-btn" onClick={handleNextQuote}>
                        <Sparkles size={14} /> Lời chúc khác
                      </button>
                    </div>
                  )}
                </div>

                {/* Panel Footer */}
                <div className="mascot-panel-footer">
                  <button className="mascot-learn-btn" onClick={handleGoToLearn}>
                    <BookOpen size={14} /> Vào học bài ngay →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MASCOT AVATAR CHARACTER */}
          <motion.div
            className={`mascot-character ${isInteractive ? 'is-interactive' : ''}`}
            onClick={isInteractive ? handleToggleMascot : undefined}
            whileHover={isInteractive ? { scale: 1.12, rotate: 4 } : {}}
            whileTap={isInteractive ? { scale: 0.95 } : {}}
            animate={
              isOpen
                ? { y: [0, -3, 0] }
                : { y: [0, -6, 0] }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            title={isInteractive ? 'Nhấn để trò chuyện với Cú Mèo!' : ''}
          >
            <span className="mascot-owl">
              <MascotIcon size={size === 'lg' ? 64 : size === 'sm' ? 38 : 54} />
            </span>
            <span className="mascot-expression">{moodData.expression}</span>
            {isInteractive && !isOpen && (
              <span className="mascot-glow-indicator" />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
