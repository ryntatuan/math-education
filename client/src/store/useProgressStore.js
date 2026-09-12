import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      // Completed lessons: { 'grade1-c1-l1': { stars: 3, completedAt: '...' } }
      completedLessons: {},

      // Exercise results: { 'grade1-c1': [{ date, score, total, ... }] }
      exerciseResults: {},

      // Daily streak
      currentStreak: 0,
      lastActiveDate: null,
      longestStreak: 0,

      // Daily challenge
      dailyChallengeCompleted: false,
      dailyChallengeDate: null,

      // Mini games stats
      mathRaceWins: 0,

      // Actions
      recordRaceWin: () => set((state) => ({ mathRaceWins: (state.mathRaceWins || 0) + 1 })),
      completeLesson: (lessonId, stars) => {
        set((state) => ({
          completedLessons: {
            ...state.completedLessons,
            [lessonId]: {
              stars: Math.max(stars, state.completedLessons[lessonId]?.stars || 0),
              completedAt: new Date().toISOString(),
            },
          },
        }))
        get().updateStreak()
      },

      addExerciseResult: (chapterId, result) => {
        set((state) => ({
          exerciseResults: {
            ...state.exerciseResults,
            [chapterId]: [
              ...(state.exerciseResults[chapterId] || []),
              { ...result, date: new Date().toISOString() },
            ],
          },
        }))
        get().updateStreak()
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        const { lastActiveDate, currentStreak, longestStreak } = get()

        if (lastActiveDate === today) return // Already counted today

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        let newStreak
        if (lastActiveDate === yesterdayStr) {
          newStreak = currentStreak + 1
        } else {
          newStreak = 1
        }

        set({
          currentStreak: newStreak,
          lastActiveDate: today,
          longestStreak: Math.max(newStreak, longestStreak),
        })
      },

      isLessonCompleted: (lessonId) => {
        return !!get().completedLessons[lessonId]
      },

      getLessonStars: (lessonId) => {
        return get().completedLessons[lessonId]?.stars || 0
      },

      getChapterProgress: (chapterId, totalLessons) => {
        const completed = Object.keys(get().completedLessons)
          .filter((id) => id.startsWith(chapterId))
          .length
        return { completed, total: totalLessons, percent: Math.round((completed / totalLessons) * 100) }
      },

      completeDailyChallenge: () => {
        const today = new Date().toISOString().split('T')[0]
        set({
          dailyChallengeCompleted: true,
          dailyChallengeDate: today,
        })
      },

      isDailyChallengeCompleted: () => {
        const today = new Date().toISOString().split('T')[0]
        const { dailyChallengeDate, dailyChallengeCompleted } = get()
        return dailyChallengeDate === today && dailyChallengeCompleted
      },
    }),
    {
      name: 'toan-vui-progress',
    }
  )
)

export default useProgressStore
