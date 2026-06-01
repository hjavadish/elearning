import { useEffect, useState } from 'react'
import { getDatabase } from '../../db'
import type { Course, PlatformStats, User } from '../../types'
import '../../styles/dashboard.css'

type SafeUser = Omit<User, 'password'>

export function AdminDashboard() {
  const [tab, setTab] = useState<'overview' | 'users' | 'courses'>('overview')
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [users, setUsers] = useState<SafeUser[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const db = getDatabase()

  const load = async () => {
    setLoading(true)
    const [s, u, c] = await Promise.all([
      db.getPlatformStats(),
      db.getAllUsers(),
      db.getAllCourses(),
    ])
    setStats(s)
    setUsers(u)
    setCourses(c)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handlePlanChange = async (userId: string, plan: User['plan']) => {
    await db.updateUserPlan(userId, plan)
    const updated = await db.getAllUsers()
    setUsers(updated)
  }

  const handleToggleCourse = async (courseId: string, isActive: boolean) => {
    await db.toggleCourseActive(courseId, isActive)
    const updated = await db.getAllCourses()
    setCourses(updated)
  }

  const roleLabel = { student: 'دانش‌آموز', parent: 'والد', admin: 'مدیر' }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <>
      <header className="dash-header">
        <h1>پنل مدیریت</h1>
        <p>مدیریت کاربران، دوره‌ها و آمار پلتفرم</p>
      </header>

      <div className="tabs">
        <button
          type="button"
          className={`tab-btn ${tab === 'overview' ? 'tab-btn--active' : ''}`}
          onClick={() => setTab('overview')}
        >
          خلاصه
        </button>
        <button
          type="button"
          className={`tab-btn ${tab === 'users' ? 'tab-btn--active' : ''}`}
          onClick={() => setTab('users')}
        >
          کاربران
        </button>
        <button
          type="button"
          className={`tab-btn ${tab === 'courses' ? 'tab-btn--active' : ''}`}
          onClick={() => setTab('courses')}
        >
          دوره‌ها
        </button>
      </div>

      {tab === 'overview' && stats && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <strong>{stats.totalUsers}</strong>
              <span>کل کاربران</span>
            </div>
            <div className="stat-card">
              <strong>{stats.students}</strong>
              <span>دانش‌آموز</span>
            </div>
            <div className="stat-card">
              <strong>{stats.parents}</strong>
              <span>والدین</span>
            </div>
            <div className="stat-card">
              <strong>{stats.activeCourses}</strong>
              <span>دوره فعال</span>
            </div>
            <div className="stat-card">
              <strong>{stats.avgProgress}٪</strong>
              <span>میانگین پیشرفت</span>
            </div>
            <div className="stat-card">
              <strong>
                {(stats.revenueMonth / 1_000_000).toFixed(1)}M
              </strong>
              <span>درآمد ماه (تومان)</span>
            </div>
          </div>
          <div className="alert alert-info">
            داده‌ها از MockDatabase (localStorage) خوانده می‌شوند — برای دیتابیس
            واقعی فقط پیاده‌سازی IDatabase در src/db/index.ts را عوض کنید.
          </div>
        </>
      )}

      {tab === 'users' && (
        <section className="panel-card">
          <h2>لیست کاربران</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>نام</th>
                <th>ایمیل</th>
                <th>نقش</th>
                <th>پلن</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td dir="ltr">{u.email}</td>
                  <td>{roleLabel[u.role]}</td>
                  <td>
                    <select
                      className="select-sm"
                      value={u.plan}
                      onChange={(e) =>
                        handlePlanChange(u.id, e.target.value as User['plan'])
                      }
                      disabled={u.role === 'admin'}
                    >
                      <option value="free">رایگان</option>
                      <option value="plus">پلاس</option>
                      <option value="pro">حرفه‌ای</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === 'courses' && (
        <section className="panel-card">
          <h2>مدیریت دوره‌ها</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>دسته</th>
                <th>درس‌ها</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c.lessonsCount}</td>
                  <td>
                    <button
                      type="button"
                      className={`btn btn-sm ${c.isActive ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleToggleCourse(c.id, !c.isActive)}
                    >
                      {c.isActive ? 'فعال' : 'غیرفعال'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  )
}
