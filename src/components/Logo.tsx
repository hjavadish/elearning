import { Link } from 'react-router-dom'
import { BRAND } from '../config/brand'

export function Logo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="logo">
      <span className="logo-icon">ر</span>
      <span>{BRAND.name}</span>
    </Link>
  )
}
