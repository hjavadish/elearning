import { xpNeededForNextLevel, xpProgressInLevel, XP_PER_LEVEL } from '../utils/gamification'
import '../styles/quiz.css'

export function GameHUD({
  xp,
  level,
  compact = false,
}: {
  xp: number
  level: number
  compact?: boolean
}) {
  const progress = xpProgressInLevel(xp)
  const pct = Math.round((progress / XP_PER_LEVEL) * 100)
  const needed = xpNeededForNextLevel(xp)

  if (compact) {
    return (
      <div className="game-hud game-hud--compact">
        <span className="game-level">Lv.{level}</span>
        <span className="game-xp">{xp} XP</span>
      </div>
    )
  }

  return (
    <div className="game-hud">
      <div className="game-hud-top">
        <span className="game-level-badge">سطح {level}</span>
        <span className="game-xp-text">{xp} XP</span>
      </div>
      <div className="game-xp-bar">
        <div className="game-xp-fill" style={{ width: `${pct}%` }} />
      </div>
      <small className="game-xp-next">{needed} XP تا سطح بعد</small>
    </div>
  )
}
