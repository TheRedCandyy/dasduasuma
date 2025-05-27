import { create } from 'zustand'

interface SensorialExperienceState {
  // Track if the user has unlocked the experience
  isUnlocked: boolean
  // Track which codes have been used
  unlockedCodes: string[]
  // Track current step in the experience (0 = not started)
  currentStep: number
  // Actions
  unlockWithCode: (code: string) => boolean
  setCurrentStep: (step: number) => void
  resetExperience: () => void
}

// Valid codes that can unlock the experience
// In a real app, these would likely come from an API or database
const VALID_CODES = ['DASDUAS2024', 'WINEEXP101', 'TESTCODE123']

export const useSensorialExperienceStore = create<SensorialExperienceState>((set, get) => ({
  isUnlocked: false,
  unlockedCodes: [],
  currentStep: 0,

  unlockWithCode: (code: string) => {
    const normalizedCode = code.trim().toUpperCase()

    // Check if code is valid
    if (!VALID_CODES.includes(normalizedCode)) {
      return false
    }

    // Update state
    set({
      isUnlocked: true,
      unlockedCodes: [...get().unlockedCodes, normalizedCode],
    })

    return true
  },

  setCurrentStep: (step: number) => {
    set({ currentStep: step })
  },

  resetExperience: () => {
    set({ currentStep: 0 })
  },
}))
