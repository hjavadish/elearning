import { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { LEVEL_LABELS } from '../../config/brand'

import { getDatabase } from '../../db'

import { useAuth } from '../../context/AuthContext'

import type { Course, Lesson, LessonLevel, LessonProgress } from '../../types'

import '../../styles/lesson.css'



const LEVEL_ORDER: LessonLevel[] = ['beginner', 'intermediate', 'advanced']



export function CourseDetailPage() {

  const { courseSlug } = useParams()

  const { user } = useAuth()

  const [course, setCourse] = useState<Course | null>(null)

  const [lessons, setLessons] = useState<Lesson[]>([])

  const [progress, setProgress] = useState<LessonProgress[]>([])

  const [loading, setLoading] = useState(true)



  useEffect(() => {

    if (!user || !courseSlug) return

    const db = getDatabase()

    db.getCourseBySlug(courseSlug)

      .then(async (c) => {

        if (!c) return

        setCourse(c)

        const [ls, pr] = await Promise.all([

          db.getLessonsByCourseId(c.id),

          db.getLessonProgress(user.id, c.id),

        ])

        setLessons(ls)

        setProgress(pr)

      })

      .finally(() => setLoading(false))

  }, [user, courseSlug])



  if (loading || !user) {

    return (

      <div className="loading-screen">

        <div className="spinner" />

      </div>

    )

  }



  if (!course) {

    return <p className="empty-state">مسیر پایتون یافت نشد.</p>

  }



  const doneIds = new Set(progress.map((p) => p.lessonId))

  const progressPct =

    lessons.length > 0

      ? Math.round((doneIds.size / lessons.length) * 100)

      : 0



  const renderLesson = (lesson: Lesson) => {

    const done = doneIds.has(lesson.id)

    return (

      <Link

        key={lesson.id}

        to={`/student/courses/${course.slug}/lesson/${lesson.slug}`}

        className={`lesson-list-item ${done ? 'lesson-list-item--done' : ''}`}

      >

        <span className="lesson-order">{done ? '✓' : lesson.order}</span>

        <div className="lesson-list-body">

          <h3>

            {lesson.quiz && <span className="lesson-quiz-tag">🎯 کوییز</span>}

            {lesson.sections.some((s) => s.type === 'playground') && (

              <span className="lesson-quiz-tag" style={{ background: 'var(--primary-subtle)', color: 'var(--primary-light)' }}>

                ⌨️ کد

              </span>

            )}

            {lesson.title}

          </h3>

          <p>{lesson.summary}</p>

        </div>

        <span className="lesson-duration">{lesson.durationMinutes} دقیقه</span>

      </Link>

    )

  }



  return (

    <>

      <div className="course-hero">

        <span className="python-badge">🐍 مسیر حرفه‌ای پایتون</span>

        <h1>{course.title}</h1>

        <p>{course.description}</p>

        <div className="course-meta">

          <span>{lessons.length} درس</span>

          <span>{course.durationHours} ساعت</span>

          <span>🎮 کوییز + XP</span>

          <span>⌨️ محیط کد مرورگر</span>

          <span>پیشرفت: {progressPct}٪</span>

        </div>

        <div className="progress-bar" style={{ marginTop: '1rem', maxWidth: 320 }}>

          <div className="progress-fill" style={{ width: `${progressPct}%` }} />

        </div>

      </div>



      <section className="panel-card">

        <h2>فهرست درس‌ها</h2>

        {LEVEL_ORDER.map((level) => {

          const group = lessons.filter((l) => l.level === level)

          if (group.length === 0) return null

          return (

            <div key={level}>

              <h3 className="level-section-title">

                <span className={`level-badge level-badge--${level}`}>

                  {LEVEL_LABELS[level]}

                </span>

              </h3>

              <div className="lesson-list">{group.map(renderLesson)}</div>

            </div>

          )

        })}

      </section>

    </>

  )

}

