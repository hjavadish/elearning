import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ENGLISH_COURSE_SLUG, PYTHON_COURSE_SLUG } from '../../config/brand'
import { getDatabase } from '../../db'
import { useAuth } from '../../context/AuthContext'
import type { Course } from '../../types'
import '../../styles/lesson.css'

export function CoursesPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const db = getDatabase()
    Promise.all([db.getAllCourses(), db.getStudentEnrollments(user.id)])
      .then(([all, enrollments]) => {
        setCourses(all.filter((c) => c.isActive))
        setEnrolledIds(new Set(enrollments.map((e) => e.courseId)))
      })
      .finally(() => setLoading(false))
  }, [user])

  const handleEnroll = async (courseId: string) => {
    if (!user) return
    await getDatabase().enrollInCourse(user.id, courseId)
    setEnrolledIds((prev) => new Set([...prev, courseId]))
  }

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
        <h1>دوره‌ها</h1>
        <p>پایتون و انگلیسی — با کوییز بازی‌وار و امتیاز XP</p>
      </header>

      <div className="course-list" style={{ flexDirection: 'column', gap: '1rem' }}>
        {courses.map((course) => {
          const enrolled = enrolledIds.has(course.id)
          const isEnglish = course.slug === ENGLISH_COURSE_SLUG
          const isPython = course.slug === PYTHON_COURSE_SLUG
          return (
            <article
              key={course.id}
              className="panel-card"
              style={{ marginBottom: 0 }}
            >
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div className="course-icon" style={{ fontSize: '2rem' }}>
                  {isEnglish ? '🇬🇧' : isPython ? '🐍' : '📚'}
                </div>
                <div style={{ flex: 1 }}>
                  <span className={isEnglish ? 'english-badge' : 'python-badge'}>
                    {course.category}
                  </span>
                  <h3 style={{ margin: '0.5rem 0' }}>{course.title}</h3>
                  <p style={{ color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
                    {course.description}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {course.lessonsCount} درس · {course.durationHours} ساعت
                    {isEnglish && ' · 🎯 کوییز در هر درس'}
                  </p>
                </div>
                <div>
                  {enrolled ? (
                    <Link
                      to={`/student/courses/${course.slug}`}
                      className="btn btn-primary"
                    >
                      ادامه دوره
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleEnroll(course.id)}
                    >
                      ثبت‌نام رایگان
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
