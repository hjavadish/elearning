import { useEffect, useState } from 'react'
import { DEMO_EMAILS } from '../../config/brand'
import { getDatabase } from '../../db'
import { useAuth } from '../../context/AuthContext'
import { PlanBadge } from '../../components/PlanBadge'
import type { ChildReport } from '../../types'
import '../../styles/dashboard.css'

export function ParentDashboard() {
  const { user } = useAuth()
  const [reports, setReports] = useState<ChildReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getDatabase()
      .getChildrenReports(user.id)
      .then(setReports)
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
        <h1>پنل والدین</h1>
        <p>پیشرفت و فعالیت فرزندانت را اینجا ببین</p>
      </header>

      {reports.length === 0 ? (
        <div className="panel-card empty-state">
          <p>هنوز فرزندی به حساب شما متصل نشده است.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            با حساب آزمایشی <code dir="ltr">{DEMO_EMAILS.parent}</code> وارد شوید.
          </p>
        </div>
      ) : (
        reports.map((report) => (
          <article key={report.student.id} className="child-card">
            <div className="child-header">
              <div>
                <h2 style={{ margin: 0 }}>{report.student.name}</h2>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>
                  {report.student.email}
                </p>
              </div>
              <PlanBadge plan={report.student.plan} />
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <strong>{report.stats.streak}</strong>
                <span>روز استریک</span>
              </div>
              <div className="stat-card">
                <strong>{report.stats.weeklyProgress}٪</strong>
                <span>پیشرفت هفتگی</span>
              </div>
              <div className="stat-card">
                <strong>{report.stats.badges}</strong>
                <span>نشان‌ها</span>
              </div>
            </div>

            <h3 style={{ margin: '1rem 0 0.75rem', fontSize: '1rem' }}>دوره‌ها</h3>
            <div className="course-list">
              {report.enrollments.map((item) => (
                <div key={item.id} className="course-item">
                  <div className="course-icon">📖</div>
                  <div className="course-item-info">
                    <h3>{item.course.title}</h3>
                    <p>آخرین بازدید: {new Date(item.lastAccessedAt).toLocaleDateString('fa-IR')}</p>
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
                </div>
              ))}
            </div>
          </article>
        ))
      )}
    </>
  )
}
