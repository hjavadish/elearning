import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GameHUD } from '../../components/GameHUD'
import { LessonContent } from '../../components/LessonContent'
import { QuizGame } from '../../components/QuizGame'
import { PYTHON_COURSE_SLUG } from '../../config/brand'
import { getDatabase } from '../../db'
import { useAuth } from '../../context/AuthContext'
import type { Course, GameProfile, Lesson } from '../../types'
import '../../styles/lesson.css'

export function LessonPage() {
  const { courseSlug, lessonSlug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [allLessons, setAllLessons] = useState<Lesson[]>([])
  const [completed, setCompleted] = useState(false)
  const [quizPassed, setQuizPassed] = useState(false)
  const [profile, setProfile] = useState<GameProfile | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !courseSlug || !lessonSlug) return
    const db = getDatabase()
    setLoading(true)
    db.getCourseBySlug(courseSlug)
      .then(async (c) => {
        if (!c) return
        const l = await db.getLessonBySlug(c.id, lessonSlug)
        if (!l) return
        const [all, prog, passed, gp] = await Promise.all([
          db.getLessonsByCourseId(c.id),
          db.getLessonProgress(user.id, c.id),
          db.hasPassedQuiz(user.id, l.id),
          db.getGameProfile(user.id),
        ])
        setCourse(c)
        setLesson(l)
        setAllLessons(all)
        setCompleted(prog.some((p) => p.lessonId === l.id))
        setQuizPassed(passed)
        setProfile(gp)
      })
      .finally(() => setLoading(false))
  }, [user, courseSlug, lessonSlug])

  const handleComplete = async () => {
    if (!user || !lesson) return
    if (lesson.quiz && !quizPassed) return
    setSaving(true)
    try {
      await getDatabase().completeLesson(user.id, lesson.id)
      setCompleted(true)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا')
    } finally {
      setSaving(false)
    }
  }

  const handleQuizPassed = async () => {
    setQuizPassed(true)
    setCompleted(true)
    const gp = await getDatabase().getGameProfile(user!.id)
    setProfile(gp)
  }

  if (loading || !user) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    )
  }

  if (!course || !lesson) {
    return <p className="empty-state">درس یافت نشد.</p>
  }

  const idx = allLessons.findIndex((l) => l.id === lesson.id)
  const prev = idx > 0 ? allLessons[idx - 1] : null
  const next = idx < allLessons.length - 1 ? allLessons[idx + 1] : null
  const base = `/student/courses/${course.slug}`
  const needsQuiz = !!lesson.quiz

  return (
    <>
      {profile && <GameHUD xp={profile.xp} level={profile.level} />}

      <header className="lesson-page-header">
        <p className="breadcrumb">
          <Link to="/student/courses">دوره‌ها</Link>
          {' / '}
          <Link to={base}>{course.title}</Link>
          {' / '}
          <span>درس {lesson.order}</span>
        </p>
        <h1>{lesson.title}</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>{lesson.summary}</p>
      </header>

      <LessonContent
        sections={lesson.sections}
        enablePlayground={course.slug === PYTHON_COURSE_SLUG}
      />

      {lesson.quiz && (
        <section className="quiz-panel">
          <h2>🎮 کوییز این درس</h2>
          {!quizPassed ? (
            <QuizGame
              quiz={lesson.quiz}
              onSubmit={(answers) =>
                getDatabase().submitQuiz(user.id, lesson.id, answers)
              }
              onPassed={handleQuizPassed}
            />
          ) : (
            <div className="quiz-result quiz-result--win">
              <p>کوییز قبول شده — +XP دریافت کردی! 🏆</p>
            </div>
          )}
        </section>
      )}

      <div className="lesson-nav">
        {prev ? (
          <Link to={`${base}/lesson/${prev.slug}`} className="btn btn-outline">
            ← درس قبل
          </Link>
        ) : (
          <span />
        )}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {!needsQuiz && !completed && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleComplete}
              disabled={saving}
            >
              {saving ? 'در حال ذخیره...' : 'تکمیل درس ✓'}
            </button>
          )}
          {completed && (
            <span
              className="badge"
              style={{ background: 'rgba(52,211,153,0.2)', color: '#6ee7b7' }}
            >
              تکمیل شده ✓
            </span>
          )}
          {needsQuiz && !quizPassed && (
            <span className="badge" style={{ background: 'rgba(251,191,36,0.2)', color: '#fcd34d' }}>
              ابتدا کوییز را پاس کن
            </span>
          )}
          {next && (completed || !needsQuiz) ? (
            <Link to={`${base}/lesson/${next.slug}`} className="btn btn-primary">
              درس بعد →
            </Link>
          ) : completed && !next ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(base)}
            >
              بازگشت به دوره 🎉
            </button>
          ) : null}
        </div>
      </div>
    </>
  )
}
