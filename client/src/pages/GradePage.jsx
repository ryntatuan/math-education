import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle2, Play, RotateCcw, ArrowRight } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar, { StarsDisplay } from '../components/ui/ProgressBar'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import curriculum, { getGrade, getChapter } from '../data/curriculum'
import soundManager from '../utils/soundManager'
import RightSidebar from '../components/layout/RightSidebar'
import './GradePage.css'

export default function GradePage() {
  const navigate = useNavigate()
  const { grade, setGrade } = useUserStore()
  const [selectedGrade, setSelectedGrade] = useState(grade || 1)

  useEffect(() => {
    if (grade && grade !== selectedGrade) {
      setSelectedGrade(grade)
    }
  }, [grade])

  const gradeData = getGrade(selectedGrade) || curriculum.grades[0]

  if (!gradeData) {
    return (
      <div className="page-empty">
        <h2>Không tìm thấy lớp</h2>
        <Button onClick={() => navigate('/')}>Về trang chủ</Button>
      </div>
    )
  }

  return (
    <div className="page-2col-layout">
      <div className="learning-main-column">
        <div className="practice-intro" style={{ marginBottom: '24px', backgroundColor: 'white', border: '1px solid #f1f5f9', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
          <div className="practice-intro-text">
            <h1>{gradeData.icon} {gradeData.name}</h1>
            <p className="grade-page-desc">{gradeData.description}</p>
          </div>

          <div className="grade-selector-tabs">
            {curriculum.grades.map((g) => (
              <button
                key={g.id}
                className={`grade-tab-btn ${selectedGrade === g.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedGrade(g.id)
                  setGrade(g.id)
                }}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

      <motion.div
        key={selectedGrade}
        className="home-chapters-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {gradeData.chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            index={index}
            gradeId={selectedGrade}
            onClick={() => navigate(`/learn/${selectedGrade}/${chapter.id}`)}
          />
        ))}
      </motion.div>
      </div>
        <RightSidebar hideOnMobile={true} />
    </div>
  )
}

function ChapterCard({ chapter, index, gradeId, onClick }) {
  const { getChapterProgress, completedLessons } = useProgressStore()
  const totalLessonsCount = chapter.lessons?.length || chapter.totalLessons || 0
  const progress = getChapterProgress(chapter.id, totalLessonsCount)
  const hasLessons = (chapter.lessons?.length || 0) > 0
  const isLocked = !hasLessons && !chapter.totalLessons

  const match = chapter.name.match(/^(?:Chương|Chủ\s*đề)\s+\d+[:\s-]*(.+)$/i)
  const chapterTag = `Chương ${index + 1}`
  const chapterTitle = match ? match[1] : chapter.name
  const fullTitle = `${chapterTag}: ${chapterTitle}`

  const isCompleted = progress.percent === 100
  const hasStarted = progress.completed > 0

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      className={`home-chapter-card ${isLocked ? 'chapter-locked' : ''}`}
      onClick={isLocked ? undefined : onClick}
      whileHover={!isLocked ? { scale: 1.02, y: -3 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
    >
      <div
        className="chapter-card-icon"
        style={{
          background: `${chapter.color || '#0284c7'}18`,
          color: chapter.color || '#0284c7'
        }}
      >
        <span>{chapter.icon || '🔢'}</span>
      </div>

      <div className="chapter-card-info">
        <div className="chapter-card-header">
          <span
            className="chapter-tag-badge"
            style={{
              color: chapter.color || '#0284c7',
              backgroundColor: `${chapter.color || '#0284c7'}15`,
              borderColor: `${chapter.color || '#0284c7'}30`,
            }}
          >
            {chapterTag}
          </span>
          {!isLocked && (
            <div
              className={`chapter-stars-badge ${progress.earnedStars > 0
                ? progress.earnedStars === progress.maxStars
                  ? 'perfect'
                  : 'active'
                : 'empty'
                }`}
              title={`Đã tích lũy ${progress.earnedStars}/${progress.maxStars} sao`}
            >
              <span className="star-icon">⭐</span>
              <span className="star-count">{progress.earnedStars}</span>
              <span className="star-max">/{progress.maxStars}</span>
            </div>
          )}
        </div>

        <h3 className="chapter-card-title" title={fullTitle}>
          {chapterTitle}
        </h3>

        <p className="chapter-card-desc" title={chapter.description}>{chapter.description}</p>

        <div className="chapter-card-footer">
          {!isLocked && (
            <div className="chapter-progress-box">
              <div className="chapter-progress-track">
                <div
                  className="chapter-progress-fill"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <span className="chapter-progress-text number">
                {progress.percent}% ({progress.completed}/{progress.total})
              </span>
            </div>
          )}

          {isLocked ? (
            <button type="button" className="btn-chapter-pill start" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              <Lock size={12} />
              <span>Sắp ra mắt</span>
            </button>
          ) : isCompleted ? (
            <button type="button" className="btn-chapter-pill done">
              <RotateCcw size={13} />
              <span>Ôn lại</span>
            </button>
          ) : hasStarted ? (
            <button type="button" className="btn-chapter-pill continue">
              <span>Học tiếp</span>
              <ArrowRight size={13} />
            </button>
          ) : (
            <button type="button" className="btn-chapter-pill start">
              <span>Bắt đầu</span>
              <Play size={12} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Chapter Detail page (Lesson list)
export function ChapterPage() {
  const navigate = useNavigate()
  const { gradeId, chapterId } = useParams()
  const { getLessonStars, isLessonCompleted, getChapterProgress } = useProgressStore()

  const chapter = getChapter(parseInt(gradeId), chapterId)

  if (!chapter) {
    return (
      <div className="page-empty">
        <h2>Không tìm thấy chương</h2>
        <Button onClick={() => navigate('/learn')}>Quay lại</Button>
      </div>
    )
  }

  const totalLessonsCount = chapter.lessons?.length || chapter.totalLessons || 0
  const progress = getChapterProgress(chapter.id, totalLessonsCount)

  return (
    <div className="chapter-detail-page">
      <div className="chapter-detail-header">
        <div className="page-nav-row">
          <button
            className="btn-back"
            onClick={() => {
              soundManager.playClick()
              navigate('/learn')
            }}
          >
            <ArrowLeft size={18} />
            <span>Quay lại Học bài</span>
          </button>
        </div>
        <div className="chapter-detail-title">
          <span className="chapter-detail-icon" style={{ background: chapter.color + '22' }}>
            {chapter.icon}
          </span>
          <div>
            <h1>{chapter.name}</h1>
            <p>{chapter.description} • {totalLessonsCount} bài học • ⭐ {progress.earnedStars}/{progress.maxStars} sao tích lũy</p>
          </div>
        </div>
      </div>

      <motion.div
        className="lessons-list"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {(!chapter.lessons || chapter.lessons.length === 0) ? (
          <div className="page-empty">
            <span style={{ fontSize: '4rem' }}>🚧</span>
            <h3>Đang xây dựng nội dung</h3>
            <p>Chương này sẽ sớm có bài học. Hãy quay lại sau nhé!</p>
          </div>
        ) : (
          chapter.lessons.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id)
            const stars = getLessonStars(lesson.id)

            return (
              <motion.div
                key={lesson.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Card
                  hoverable
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  className={`lesson-card ${completed ? 'lesson-completed' : ''}`}
                >
                  <div className="lesson-card-inner">
                    <div
                      className="lesson-number"
                      style={{
                        background: completed
                          ? 'var(--color-success)'
                          : chapter.color + '22',
                        color: completed ? 'white' : chapter.color,
                      }}
                    >
                      {completed ? '✓' : index + 1}
                    </div>

                    <div className="lesson-info">
                      <h4>{lesson.title}</h4>
                      <p>{lesson.description}</p>
                      {completed && <StarsDisplay stars={stars} maxStars={3} size="sm" />}
                    </div>

                    <div className="lesson-action">
                      <Button
                        variant={completed ? 'outline' : 'primary'}
                        size="sm"
                      >
                        {completed ? 'Học lại' : 'Bắt đầu'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })
        )}
      </motion.div>
    </div>
  )
}
