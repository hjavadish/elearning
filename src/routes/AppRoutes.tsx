import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { DashboardLayout } from '../components/layouts/DashboardLayout'
import { PublicLayout } from '../components/layouts/PublicLayout'
import { dashboardPath, useAuth } from '../context/AuthContext'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { ParentDashboard } from '../pages/parent/ParentDashboard'
import { RegisterPage } from '../pages/RegisterPage'
import { CoursesPage } from '../pages/student/CoursesPage'
import { LessonPage } from '../pages/student/LessonPage'
import { CourseDetailPage } from '../pages/student/CourseDetailPage'
import { StudentDashboard } from '../pages/student/StudentDashboard'

function HomeRedirect() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to={dashboardPath(user.role)} replace />
  return <LandingPage />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={['student']} />}>
        <Route
          element={
            <DashboardLayout
              role="student"
              navItems={[
                { to: '/student', label: 'داشبورد', end: true },
                { to: '/student/courses', label: 'مسیر پایتون' },
              ]}
            />
          }
        >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<CoursesPage />} />
          <Route path="/student/courses/:courseSlug" element={<CourseDetailPage />} />
          <Route
            path="/student/courses/:courseSlug/lesson/:lessonSlug"
            element={<LessonPage />}
          />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['parent']} />}>
        <Route
          element={
            <DashboardLayout
              role="parent"
              navItems={[{ to: '/parent', label: 'فرزندان من', end: true }]}
            />
          }
        >
          <Route path="/parent" element={<ParentDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route
          element={
            <DashboardLayout
              role="admin"
              navItems={[{ to: '/admin', label: 'مدیریت', end: true }]}
            />
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
