// Master Curriculum for Primary School Math (MVP: Grade 1, 2, 3)
// 21 Chapters, with 12 rich interactive lessons per chapter (252 lessons in total)
import { grade1Data } from './grade1Data'
import { grade2Data } from './grade2Data'
import { grade3Data } from './grade3Data'

const curriculum = {
  grades: [grade1Data, grade2Data, grade3Data],
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
