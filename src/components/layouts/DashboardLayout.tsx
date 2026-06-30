import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'

const roleLabels = {
  student: 'پنل دانش‌آموز',
  parent: 'پنل والدین',
  admin: 'پنل مدیریت',
}

interface NavItem {
  to: string
  label: string
  end?: boolean
}

export function DashboardLayout({
  role,
  navItems,
}: {
  role: 'student' | 'parent' | 'admin'
  navItems: NavItem[]
}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Logo to={`/${role}`} />
        <p className="sidebar-role">{roleLabels[role]}</p>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <ThemeToggle className="theme-toggle--sidebar" />
          <div className="user-chip">
            <span className="user-avatar">{user?.name.charAt(0)}</span>
            <div>
              <strong>{user?.name}</strong>
              <small>{user?.email}</small>
            </div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
            خروج
          </button>
          <a href="/" className="sidebar-home">
            بازگشت به سایت
          </a>
        </div>
      </aside>
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  )
}
