import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PYTHON_COURSE_SLUG } from '../../config/brand'
import { GameHUD } from '../../components/GameHUD'
import { getDatabase } from '../../db'
import { useAuth } from '../../context/AuthContext'
import { PlanBadge } from '../../components/PlanBadge'
import type { StudentStats } from '../../types'
import '../../styles/dashboard.css'

type EnrollmentWithCourse = Awaited<
  ReturnType<ReturnType<typeof getDatabase>['getStudentEnrollments']>
>[number]

export function StudentDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<StudentStats | null>(null)
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const db = getDatabase()
    Promise.all([
      db.getStudentStats(user.id),
      db.getStudentEnrollments(user.id),
    ])
      .then(([s, e]) => {
        setStats(s)
        setEnrollments(e)
      })
      .finally(() => setLoading(false))
  }, [user])

  if (loading || !user) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    )
  }

  const pythonEnrollment = enrollments.find((e) => e.course.slug === PYTHON_COURSE_SLUG)

  return (
    <>
      <header className="dash-header">
        <h1>سلام، {user.name} 👋</h1>
        <p>
          پلن فعلی: <PlanBadge plan={user.plan} /> · مسیر یادگیری: 🐍 پایتون
        </p>
      </header>

      {stats && (
        <>
          <GameHUD xp={stats.xp} level={stats.level} />
          <div className="stats-grid">
            <div className="stat-card">
              <strong>{stats.streak}</strong>
              <span>روز استریک 🔥</span>
            </div>
            <div className="stat-card">
              <strong>{stats.weeklyProgress}٪</strong>
              <span>پیشرفت هفتگی</span>
            </div>
            <div className="stat-card">
              <strong>{stats.completedLessons}</strong>
              <span>درس تکمیل‌شده</span>
            </div>
            <div className="stat-card">
              <strong>{stats.totalQuizzesPassed}</strong>
              <span>کوییز قبول‌شده 🎯</span>
            </div>
          </div>
        </>
      )}

      <section className="panel-card">
        <h2>مسیر پایتون</h2>
        {pythonEnrollment ? (
          <Link
            to={`/student/courses/${PYTHON_COURSE_SLUG}`}
            className="course-item"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="course-icon">🐍</div>
            <div className="course-item-info">
              <h3>{pythonEnrollment.course.title}</h3>
              <p>
                {pythonEnrollment.course.lessonsCount} درس · محیط کد مرورگر · کوییز و XP
              </p>
            </div>
            <div className="course-progress">
              <span>{pythonEnrollment.progress}٪</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${pythonEnrollment.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ) : (
          <p className="empty-state">در حال آماده‌سازی مسیر پایتون...</p>
        )}
      </section>

      <section className="panel-card">
        <h2>ادامه یادگیری 🎮</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          کد بنویس، کوییز بده، XP جمع کن و پروژه بساز — همه در یک مسیر حرفه‌ای پایتون.
        </p>
        <Link
          to={`/student/courses/${PYTHON_COURSE_SLUG}`}
          className="btn btn-primary btn-lg"
        >
          🐍 ادامه مسیر پایتون
        </Link>
      </section>
    </>
  )
}
