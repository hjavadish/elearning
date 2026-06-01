import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ENGLISH_COURSE_SLUG, PYTHON_COURSE_SLUG } from '../../config/brand'
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

  return (
    <>
      <header className="dash-header">
        <h1>سلام، {user.name} 👋</h1>
        <p>
          پلن فعلی: <PlanBadge plan={user.plan} />
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
        <h2>دوره‌های من</h2>
        {enrollments.length === 0 ? (
          <p className="empty-state">هنوز در دوره‌ای ثبت‌نام نکردی</p>
        ) : (
          <div className="course-list">
            {enrollments.map((item) => (
              <Link
                key={item.id}
                to={`/student/courses/${item.course.slug}`}
                className="course-item"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="course-icon">🐍</div>
                <div className="course-item-info">
                  <h3>{item.course.title}</h3>
                  <p>{item.course.category} · {item.course.lessonsCount} درس</p>
                </div>
                <div className="course-progress">
                  <span>{item.progress}٪</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="panel-card">
        <h2>یادگیری بازی‌وار 🎮</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          کوییز بده، XP جمع کن و سطحت رو بالا ببر!
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to={`/student/courses/${PYTHON_COURSE_SLUG}`}
            className="btn btn-outline"
          >
            🐍 پایتون
          </Link>
          <Link
            to={`/student/courses/${ENGLISH_COURSE_SLUG}`}
            className="btn btn-primary"
          >
            🇬🇧 انگلیسی + کوییز
          </Link>
        </div>
      </section>
    </>
  )
}
