import { Navigate, Outlet } from 'react-router-dom'
import { dashboardPath, useAuth } from '../context/AuthContext'
import type { UserRole } from '../types'

export function ProtectedRoute({ roles }: { roles?: UserRole[] }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>در حال بارگذاری...</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={dashboardPath(user.role)} replace />
  }

  return <Outlet />
}
