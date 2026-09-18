import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useAuthStore from './useAuthStore'
import useUserStore from './useUserStore'

const getDatePlusDays = (days = 1) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

const DEFAULT_DAILY_QUESTS = [
  { id: 'quest_lesson', title: 'Hoàn thành 2 bài học', target: 2, current: 0, reward: 15, done: false, icon: '📖' },
  { id: 'quest_game', title: 'Chơi 1 ván mini game', target: 1, current: 0, reward: 10, done: false, icon: '🏎️' },
  { id: 'quest_pet', title: 'Cho thú cưng ăn 1 bữa', target: 1, current: 0, reward: 10, done: false, icon: '🐾' },
]

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

      // Daily quests
      dailyQuestsDate: null,
      dailyQuests: DEFAULT_DAILY_QUESTS,
      dailyQuestsClaimed: false,

      // Mini games stats
      mathRaceWins: 0,
      totalGamesPlayed: 0,

      // Spaced Repetition Mistakes Queue
      mistakesQueue: [],

      // Actions
      recordRaceWin: () => {
        set((state) => ({ mathRaceWins: (state.mathRaceWins || 0) + 1 }))
        get().recordGamePlayed()
      },

      recordGamePlayed: () => {
        try {
          if (useAuthStore.getState().isGuest) return
        } catch {}
        set((state) => ({ totalGamesPlayed: (state.totalGamesPlayed || 0) + 1 }))
        get().updateStreak()
        get().progressQuest('quest_game', 1)
      },

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
        get().progressQuest('quest_lesson', 1)
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

      // Flexible Streak: Called on any lesson OR any game played
      updateStreak: () => {
        try {
          if (useAuthStore.getState().isGuest) return
        } catch {}
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

      // Daily Quests Management
      initOrResetDailyQuests: () => {
        const today = new Date().toISOString().split('T')[0]
        const { dailyQuestsDate, dailyQuests } = get()
        if (dailyQuestsDate !== today) {
          set({
            dailyQuestsDate: today,
            dailyQuests: DEFAULT_DAILY_QUESTS.map((q) => ({ ...q, current: 0, done: false })),
            dailyQuestsClaimed: false,
          })
        }
      },

      progressQuest: (questId, amount = 1) => {
        get().initOrResetDailyQuests()
        const state = get()
        let coinsToGive = 0
        let xpToGive = 0

        const quests = (state.dailyQuests || DEFAULT_DAILY_QUESTS).map((q) => {
          if (q.id === questId && !q.done) {
            const nextCur = Math.min(q.target, q.current + amount)
            const isDoneNow = nextCur >= q.target
            if (isDoneNow) {
              coinsToGive += q.reward
              xpToGive += q.reward * 2
            }
            return {
              ...q,
              current: nextCur,
              done: isDoneNow,
            }
          }
          return q
        })
        set({ dailyQuests: quests })

        if (coinsToGive > 0 || xpToGive > 0) {
          try {
            if (!useAuthStore.getState().isGuest) {
              useUserStore.getState().addCoins(coinsToGive)
              useUserStore.getState().addXp(xpToGive)
            }
          } catch (e) {
            console.error('Failed to give quest rewards:', e)
          }
        }
      },

      claimDailyQuestsReward: (addCoins, addXp) => {
        if (get().dailyQuestsClaimed) return
        set({ dailyQuestsClaimed: true })
        if (addCoins) addCoins(50)
        if (addXp) addXp(60)
      },

      // Mistakes / Spaced Repetition Actions
      recordMistake: (questionObj) => {
        const today = new Date().toISOString().split('T')[0]
        const state = get()
        const queue = state.mistakesQueue || []

        const existingIdx = queue.findIndex(
          (m) => m.question === questionObj.question && !m.mastered
        )

        if (existingIdx >= 0) {
          const updated = [...queue]
          updated[existingIdx] = {
            ...updated[existingIdx],
            failedCount: (updated[existingIdx].failedCount || 1) + 1,
            stage: 1,
            nextReviewDate: getDatePlusDays(1),
            lastFailedAt: new Date().toISOString(),
          }
          set({ mistakesQueue: updated })
        } else {
          const newMistake = {
            id: 'mst_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            question: questionObj.question,
            options: questionObj.options,
            answer: questionObj.answer,
            hint: questionObj.hint || 'Hãy suy nghĩ cẩn thận từng bước nhé!',
            explanation: questionObj.explanation || `Đáp án đúng là: ${questionObj.answer}`,
            visualDisplay: questionObj.visualDisplay || null,
            grade: questionObj.grade || 1,
            topic: questionObj.topic || null,
            failedCount: 1,
            stage: 1, // 1: 1 day, 2: 3 days, 3: 7 days, 4: mastered
            nextReviewDate: getDatePlusDays(1),
            createdAt: new Date().toISOString(),
            mastered: false,
          }
          set({ mistakesQueue: [newMistake, ...queue] })
        }
      },

      resolveMistake: (id, isCorrect) => {
        const state = get()
        const queue = state.mistakesQueue || []
        const today = new Date().toISOString().split('T')[0]

        const updated = queue.map((m) => {
          if (m.id !== id) return m

          if (isCorrect) {
            const nextStage = (m.stage || 1) + 1
            if (nextStage >= 4) {
              return { ...m, stage: 4, mastered: true, masteredAt: today }
            }
            const nextDays = nextStage === 2 ? 3 : 7
            return {
              ...m,
              stage: nextStage,
              nextReviewDate: getDatePlusDays(nextDays),
              lastReviewedAt: today,
            }
          } else {
            // Wrong again: reset to stage 1
            return {
              ...m,
              stage: 1,
              failedCount: (m.failedCount || 1) + 1,
              nextReviewDate: getDatePlusDays(1),
              lastReviewedAt: today,
            }
          }
        })

        set({ mistakesQueue: updated })
      },

      getDueMistakes: () => {
        const today = new Date().toISOString().split('T')[0]
        const queue = get().mistakesQueue || []
        return queue.filter((m) => !m.mastered && (m.nextReviewDate <= today || !m.nextReviewDate))
      },

      isLessonCompleted: (lessonId) => {
        return !!get().completedLessons[lessonId]
      },

      getLessonStars: (lessonId) => {
        return get().completedLessons[lessonId]?.stars || 0
      },

      getChapterProgress: (chapterId, totalLessons) => {
        const completedLessons = get().completedLessons || {}
        let completed = 0
        let earnedStars = 0

        Object.entries(completedLessons).forEach(([id, data]) => {
          if (id === chapterId || id.startsWith(`${chapterId}-`)) {
            completed++
            earnedStars += (data?.stars || 0)
          }
        })

        const total = totalLessons || 0
        const maxStars = total * 3
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0

        return {
          completed,
          total,
          percent,
          earnedStars,
          maxStars,
        }
      },

      setLeagueXp: (xp) =>
        set((state) => ({
          exerciseResults: {
            ...(state.exerciseResults || {}),
            __league: { userWeeklyXp: xp },
          },
        })),

      resetProgress: () =>
        set({
          completedLessons: {},
          exerciseResults: {},
          currentStreak: 0,
          lastActiveDate: null,
          longestStreak: 0,
          dailyChallengeCompleted: false,
          dailyChallengeDate: null,
          dailyQuestsDate: null,
          dailyQuests: DEFAULT_DAILY_QUESTS.map((q) => ({ ...q, current: 0, done: false })),
          dailyQuestsClaimed: false,
          mathRaceWins: 0,
          totalGamesPlayed: 0,
          mistakesQueue: [],
        }),

      completeDailyChallenge: () => {
        const today = new Date().toISOString().split('T')[0]
        set((state) => ({
          dailyChallengeCompleted: true,
          dailyChallengeDate: today,
          exerciseResults: {
            ...(state.exerciseResults || {}),
            __daily_challenge: { date: today, completed: true },
          },
        }))
      },

      isDailyChallengeCompleted: () => {
        const today = new Date().toISOString().split('T')[0]
        const { dailyChallengeDate, dailyChallengeCompleted, exerciseResults } = get()
        const meta = exerciseResults?.__daily_challenge
        if (meta && meta.date === today && meta.completed) {
          return true
        }
        return dailyChallengeDate === today && !!dailyChallengeCompleted
      },
    }),
    {
      name: 'toan-vui-progress',
    }
  )
)

export default useProgressStore
