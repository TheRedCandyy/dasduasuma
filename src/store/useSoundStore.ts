import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SoundState {
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
}

export const useSoundStore = create<SoundState>()(
  persist(
    set => ({
      soundEnabled: false, // Default value
      setSoundEnabled: (enabled: boolean) => set({ soundEnabled: enabled }),
    }),
    {
      name: 'sound-storage', // Name for the localStorage key
    }
  )
)
