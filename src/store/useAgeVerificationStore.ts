import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AgeVerificationState {
  isVerified: boolean
  setVerified: (value: boolean) => void
}

export const useAgeVerificationStore = create<AgeVerificationState>()(
  persist(
    set => ({
      isVerified: false,
      setVerified: (value: boolean) => set({ isVerified: value }),
    }),
    {
      name: 'age-verification-storage',
    }
  )
)
