import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar, { StarsDisplay } from '../components/ui/ProgressBar'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import curriculum, { getGrade, getChapter } from '../data/curriculum'
import soundManager from '../utils/soundManager'
import './GradePage.css'

export default function GradePage() {
  const navigate = useNavigate()
  const { grade, setGrade } = useUserStore()
  const [selectedGrade, setSelectedGrade] = useState(grade || 1)
  const gradeData = getGrade(selectedGrade)

  if (!gradeData) {
    return (
      <div className="page-empty">
        <h2>Không tìm thấy lớp</h2>
        <Button onClick={() => navigate('/')}>Về trang chủ</Button>
      </div>
    )
  }

  return (
    <div className="grade-page">
      <div className="grade-page-header">
        <div className="page-nav-row">
          <button
            className="btn-back"
            onClick={() => {
              soundManager.playClick()
              navigate('/')
            }}
          >
            <ArrowLeft size={18} />
            <span>Trang chủ</span>
          </button>

          <div className="grade-nav-tabs">
            {[1, 2, 3].map((g) => (
              <button
                key={g}
                className={`grade-tab-pill ${selectedGrade === g ? 'active' : ''}`}
                onClick={() => {
                  setSelectedGrade(g)
                  setGrade(g)
                  soundManager.playClick()
                }}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>

        <div className="grade-header-content">
          <h1>{gradeData.icon} {gradeData.name}</h1>
          <p className="grade-page-desc">{gradeData.description}</p>
        </div>
      </div>

      <motion.div
        key={selectedGrade}
        className="chapters-list"
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
  )
}

function ChapterCard({ chapter, index, gradeId, onClick }) {
  const { getChapterProgress, completedLessons } = useProgressStore()
  const totalLessonsCount = chapter.lessons?.length || chapter.totalLessons || 0
  const progress = getChapterProgress(chapter.id, totalLessonsCount)
  const hasLessons = chapter.lessons.length > 0
  const isLocked = !hasLessons

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -30 },
        show: { opacity: 1, x: 0 },
      }}
    >
      <Card
        hoverable={!isLocked}
        onClick={isLocked ? undefined : onClick}
        className={`chapter-card ${isLocked ? 'chapter-locked' : ''}`}
      >
        <div className="chapter-card-inner">
          <div
            className="chapter-number"
            style={{ background: chapter.color + '22', color: chapter.color }}
          >
            {isLocked ? <Lock size={20} /> : index + 1}
          </div>

          <div className="chapter-info">
            <div className="chapter-title-row">
              <h3>{chapter.name}</h3>
              {progress.percent === 100 && (
                <CheckCircle2 size={20} className="chapter-complete-icon" />
              )}
            </div>
            <p className="chapter-desc">{chapter.description}</p>

            <div className="chapter-meta">
              <Badge variant="default" size="sm" icon={chapter.icon}>
                {totalLessonsCount} bài học
              </Badge>
              {progress.completed > 0 && (
                <Badge variant={progress.percent === 100 ? 'success' : 'progress'} size="sm">
                  {progress.percent === 100 ? `🏆 Hoàn thành (${progress.total}/${progress.total})` : `⭐ Đã học ${progress.completed}/${progress.total}`}
                </Badge>
              )}
              {isLocked && (
                <Badge variant="default" size="sm">
                  🔒 Sắp ra mắt
                </Badge>
              )}
            </div>

            {progress.completed > 0 && (
              <ProgressBar
                value={progress.completed}
                max={progress.total}
                variant="success"
                size="sm"
              />
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Chapter Detail page (Lesson list)
export function ChapterPage() {
  const navigate = useNavigate()
  const { gradeId, chapterId } = useParams()
  const { getLessonStars, isLessonCompleted } = useProgressStore()

  const chapter = getChapter(parseInt(gradeId), chapterId)

  if (!chapter) {
    return (
      <div className="page-empty">
        <h2>Không tìm thấy chương</h2>
        <Button onClick={() => navigate('/learn')}>Quay lại</Button>
      </div>
    )
  }

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
            <p>{chapter.description} • {chapter.lessons.length} bài học</p>
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
        {chapter.lessons.length === 0 ? (
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
