import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const PET_TYPES = [
  { id: 'corgi', name: 'Corgi Thông Thái', icon: '🐶', desc: 'Trung thành, thích nhẩm toán nhanh' },
  { id: 'cat', name: 'Mèo Mướp Siêu Nhẩm', icon: '🐱', desc: 'Nhanh nhẹn, mê các con số' },
  { id: 'owl', name: 'Cú Con Trí Tuệ', icon: '🦉', desc: 'Thần đồng toán học rừng xanh' },
  { id: 'dragon', name: 'Rồng Nhỏ May Mắn', icon: '🐲', desc: 'Mạnh mẽ, tỏa năng lượng tích cực' },
]

export const FOOD_TYPES = [
  { id: 'apple', name: 'Táo Trí Tuệ', icon: '🍎', hungerGain: 20, expGain: 15 },
  { id: 'croissant', name: 'Bánh Tri Thức', icon: '🥐', hungerGain: 35, expGain: 30 },
  { id: 'candy', name: 'Kẹo Năng Lượng', icon: '🍬', hungerGain: 15, expGain: 20 },
]

const usePetStore = create(
  persist(
    (set, get) => ({
      // Current Pet State
      hasPet: false,
      petType: 'corgi',
      petName: 'Bạn Cún Nhỏ',
      hunger: 80, // 0 - 100
      happiness: 90, // 0 - 100
      level: 1,
      exp: 0,
      expForNextLevel: 100,
      stage: 'baby', // 'egg' | 'baby' | 'teen' | 'master'
      lastFedTime: Date.now(),

      // Foods inventory: { apple: 3, croissant: 1, candy: 2 }
      inventory: {
        apple: 3,
        croissant: 2,
        candy: 2,
      },

      // Speech bubble
      petSpeech: 'Chào bạn nhỏ! Cùng học toán thật vui nhé! ✨',

      // Actions
      adoptPet: (typeId, name) => {
        const found = PET_TYPES.find((p) => p.id === typeId) || PET_TYPES[0]
        set({
          hasPet: true,
          petType: found.id,
          petName: name || found.name,
          hunger: 90,
          happiness: 100,
          level: 1,
          exp: 0,
          expForNextLevel: 100,
          stage: 'baby',
          petSpeech: `Xin chào! Tớ là ${name || found.name}! Rất vui được đồng hành cùng bạn! 🎉`,
        })
      },

      addFood: (foodId, amount = 1) => {
        set((state) => ({
          inventory: {
            ...state.inventory,
            [foodId]: (state.inventory[foodId] || 0) + amount,
          },
        }))
      },

      feedPet: (foodId) => {
        const state = get()
        const count = state.inventory[foodId] || 0
        if (count <= 0) return false

        const food = FOOD_TYPES.find((f) => f.id === foodId)
        if (!food) return false

        let newExp = state.exp + food.expGain
        let newLevel = state.level
        let newNextExp = state.expForNextLevel
        let newStage = state.stage

        // Level up check
        while (newExp >= newNextExp) {
          newExp -= newNextExp
          newLevel += 1
          newNextExp = Math.floor(newNextExp * 1.35)

          if (newLevel >= 10) newStage = 'master'
          else if (newLevel >= 5) newStage = 'teen'
          else newStage = 'baby'
        }

        const phrases = [
          'Ngon quá đi! Cảm ơn bé nhiều nha! 💖',
          'Được ăn no rồi, tớ thấy thông minh hơn hẳn! 🧠',
          'Bé học giỏi ghê, tớ vui lắm luôn! ✨',
          'Yum yum! Cùng giải bài tiếp nào bạn ơi! 🚀',
        ]
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]

        set({
          inventory: {
            ...state.inventory,
            [foodId]: count - 1,
          },
          hunger: Math.min(100, state.hunger + food.hungerGain),
          happiness: Math.min(100, state.happiness + 15),
          exp: newExp,
          level: newLevel,
          expForNextLevel: newNextExp,
          stage: newStage,
          lastFedTime: Date.now(),
          petSpeech: randomPhrase,
        })

        return true
      },

      petPet: () => {
        const phrases = [
          'Gâu gâu! Bé vuốt ve thích quá à! 🥰',
          'Hi hi, nhột quá đi! Yêu bé nhất trần đời! ❤️',
          'Tớ có thêm năng lượng để cùng bé học bài rồi! ⭐',
        ]
        set((state) => ({
          happiness: Math.min(100, state.happiness + 10),
          petSpeech: phrases[Math.floor(Math.random() * phrases.length)],
        }))
      },

      rewardFoodForStudy: () => {
        // Randomly reward an apple or croissant
        const foodId = Math.random() > 0.4 ? 'apple' : 'croissant'
        get().addFood(foodId, 1)
        return foodId
      },

      resetPet: () =>
        set({
          hasPet: false,
          petType: 'corgi',
          petName: 'Bạn Cún Nhỏ',
          hunger: 80,
          happiness: 90,
          level: 1,
          exp: 0,
          expForNextLevel: 100,
          stage: 'baby',
          lastFedTime: Date.now(),
          inventory: {
            apple: 3,
            croissant: 2,
            candy: 2,
          },
          petSpeech: 'Chào bạn nhỏ! Cùng học toán thật vui nhé! ✨',
        }),
    }),
    {
      name: 'toan-vui-pet',
    }
  )
)

export default usePetStore
