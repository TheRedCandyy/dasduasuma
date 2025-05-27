import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  language: string | null // e.g., 'en', 'pt', or null if not set
  languagePreferencePreviouslySet: boolean // Tracks if user has ever made a choice or if loaded from storage
  setLanguage: (language: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      language: null,
      languagePreferencePreviouslySet: false,
      setLanguage: (lang: string) => set({ language: lang, languagePreferencePreviouslySet: true }),
    }),
    {
      name: 'settings-storage', // localStorage key
      // partialize: (state) => ({ language: state.language }), // Optionally, only persist specific parts
    }
  )
)
