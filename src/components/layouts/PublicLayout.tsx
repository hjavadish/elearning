import { Link, Outlet } from 'react-router-dom'
import { dashboardPath, useAuth } from '../../context/AuthContext'
import { Logo } from '../Logo'

export function PublicLayout() {
  const { user } = useAuth()

  return (
    <div className="page">
      <div className="bg-glow bg-glow--1" aria-hidden />
      <div className="bg-glow bg-glow--2" aria-hidden />
      <header className="header">
        <Logo />
        <nav className="nav">
          <a href="/#features">امکانات</a>
          <a href="/#pricing">تعرفه‌ها</a>
          <a href="/#faq">سوالات</a>
        </nav>
        <div className="header-actions">
          {user ? (
            <Link to={dashboardPath(user.role)} className="btn btn-primary">
              پنل من
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                ورود
              </Link>
              <Link to="/register" className="btn btn-primary">
                ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  )
}
