import type { PlanType } from '../types'

const labels: Record<PlanType, string> = {
  free: 'رایگان',
  plus: 'پلاس',
  pro: 'حرفه‌ای',
}

export function PlanBadge({ plan }: { plan: PlanType }) {
  return <span className={`badge badge-${plan}`}>{labels[plan]}</span>
}
