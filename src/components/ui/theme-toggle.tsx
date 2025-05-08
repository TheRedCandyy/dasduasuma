import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem('theme') as Theme) || 'system'
    )

    useEffect(() => {
        const doc = document.documentElement
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light'

        const currentTheme = theme === 'system' ? systemTheme : theme

        doc.classList.remove('light', 'dark')
        doc.classList.add(currentTheme)
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`rounded-md p-2 ${
                    theme === 'light'
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                }`}
                onClick={() => setTheme('light')}
                title="Light mode"
            >
                <Sun className="h-5 w-5" />
                <span className="sr-only">Light mode</span>
            </button>
            <button
                className={`rounded-md p-2 ${
                    theme === 'dark'
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                }`}
                onClick={() => setTheme('dark')}
                title="Dark mode"
            >
                <Moon className="h-5 w-5" />
                <span className="sr-only">Dark mode</span>
            </button>
        </div>
    )
}
