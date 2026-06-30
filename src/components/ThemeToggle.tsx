import { useTheme } from '../context/ThemeContext'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? 'فعال‌سازی تم روشن' : 'فعال‌سازی تم تیره'}
      title={isDark ? 'تم روشن' : 'تم تیره'}
    >
      <span className="theme-toggle__track" aria-hidden>
        <span className={`theme-toggle__thumb ${isDark ? 'theme-toggle__thumb--dark' : ''}`}>
          <span className="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
          <span className="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
        </span>
      </span>
      <span className="theme-toggle__label">{isDark ? 'روشن' : 'تیره'}</span>
    </button>
  )
}
