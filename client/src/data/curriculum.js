// Master Curriculum for Vietnam Primary School Math (Grade 1 to Grade 5)
// 5 Grades, 10 Chapters each (50 Chapters total)
import { grade1Data } from './grade1Data.js'
import { grade2Data } from './grade2Data.js'
import { grade3Data } from './grade3Data.js'
import { grade4Data } from './grade4Data.js'
import { grade5Data } from './grade5Data.js'

const curriculum = {
  grades: [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data],
}

export default curriculum

// Helper functions
export function getGrade(gradeId) {
  return curriculum.grades.find((g) => g.id === Number(gradeId))
}

export function getChapter(gradeId, chapterId) {
  const grade = getGrade(gradeId)
  return grade?.chapters.find((c) => c.id === chapterId)
}

export function getLesson(gradeId, chapterId, lessonId) {
  const chapter = getChapter(gradeId, chapterId)
  return chapter?.lessons.find((l) => l.id === lessonId)
}

export function findLessonById(lessonId) {
  for (const grade of curriculum.grades) {
    for (const chapter of grade.chapters) {
      const lesson = chapter.lessons.find((l) => l.id === lessonId)
      if (lesson) {
        return { lesson, chapter, grade }
      }
    }
  }
  return null
}
