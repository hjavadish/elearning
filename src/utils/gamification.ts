export const XP_PER_LEVEL = 100

export function xpProgressInLevel(xp: number): number {
  return xp % XP_PER_LEVEL
}

export function xpNeededForNextLevel(xp: number): number {
  const progress = xpProgressInLevel(xp)
  return XP_PER_LEVEL - progress
}

export function xpToLevel(xp: number): number {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1)
}
