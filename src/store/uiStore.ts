import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
    // Cart sidebar state
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
    toggleCart: () => void

    // Search state
    searchQuery: string
    setSearchQuery: (query: string) => void
    clearSearchQuery: () => void

    // Category filter state
    activeCategory: string | null
    setActiveCategory: (category: string | null) => void
}

export const useUIStore = create<UIState>()(
    devtools((set, get) => ({
        // Cart sidebar state
        isCartOpen: false,
        openCart: () => set({ isCartOpen: true }),
        closeCart: () => set({ isCartOpen: false }),
        toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

        // Search state
        searchQuery: '',
        setSearchQuery: (query) => set({ searchQuery: query }),
        clearSearchQuery: () => set({ searchQuery: '' }),

        // Category filter state
        activeCategory: null,
        setActiveCategory: (category) => set({ activeCategory: category }),
    }))
)
