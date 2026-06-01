import { STORAGE_KEYS } from '../../config/brand'
import { PYTHON_COURSE_ID } from '../../data/python-lessons'
import type { IDatabase } from '../interface'
import { xpToLevel } from '../../utils/gamification'
import type {
  AuthResult,
  ChildReport,
  Course,
  Enrollment,
  GameProfile,
  Lesson,
  LessonProgress,
  PlatformStats,
  QuizAttempt,
  QuizResult,
  RegisterInput,
  Session,
  StudentStats,
  User,
} from '../../types'
import {
  SEED_COURSES,
  SEED_ENROLLMENTS,
  SEED_GAME_PROFILES,
  SEED_LESSONS,
  SEED_USERS,
} from './seed'

interface DbState {
  users: User[]
  courses: Course[]
  lessons: Lesson[]
  enrollments: Enrollment[]
  lessonProgress: LessonProgress[]
  gameProfiles: GameProfile[]
  quizAttempts: QuizAttempt[]
  sessions: Session[]
}

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function omitPassword(user: User): Omit<User, 'password'> {
  const { password: _, ...rest } = user
  return rest
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export class MockDatabase implements IDatabase {
  private state: DbState

  constructor() {
    this.state = this.load()
  }

  private load(): DbState {
    const raw = localStorage.getItem(STORAGE_KEYS.db)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as DbState
        const hasEnglish = parsed.courses?.some((c) => c.slug === 'english')
        const hasPlayground = parsed.lessons?.some((l) =>
          l.sections?.some((s) => s.type === 'playground'),
        )
        if (parsed.lessons?.length && hasEnglish && parsed.gameProfiles && hasPlayground)
          return parsed
      } catch {
        /* seed */
      }
    }
    const initial: DbState = {
      users: [...SEED_USERS],
      courses: [...SEED_COURSES],
      lessons: [...SEED_LESSONS],
      enrollments: [...SEED_ENROLLMENTS],
      lessonProgress: [
        { userId: 'u-student', lessonId: 'l-1', completedAt: '2026-05-20T10:00:00Z' },
        { userId: 'u-student', lessonId: 'l-2', completedAt: '2026-05-22T10:00:00Z' },
        { userId: 'u-student', lessonId: 'en-1', completedAt: '2026-06-01T08:00:00Z' },
      ],
      gameProfiles: [...SEED_GAME_PROFILES],
      quizAttempts: [
        {
          userId: 'u-student',
          lessonId: 'en-1',
          score: 100,
          passed: true,
          xpEarned: 50,
          completedAt: '2026-06-01T08:30:00Z',
        },
      ],
      sessions: [],
    }
    this.persist(initial)
    return initial
  }

  private persist(state: DbState = this.state): void {
    this.state = state
    localStorage.setItem(STORAGE_KEYS.db, JSON.stringify(state))
  }

  private findUserByEmail(email: string): User | undefined {
    return this.state.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    )
  }

  private createSession(userId: string): Session {
    const session: Session = {
      userId,
      token: generateId('sess'),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    this.state.sessions.push(session)
    this.persist()
    return session
  }

  private calcCourseProgress(userId: string, courseId: string): number {
    const lessons = this.state.lessons.filter((l) => l.courseId === courseId)
    if (lessons.length === 0) return 0
    const done = this.state.lessonProgress.filter(
      (p) => p.userId === userId && lessons.some((l) => l.id === p.lessonId),
    ).length
    return Math.round((done / lessons.length) * 100)
  }

  private syncEnrollmentProgress(userId: string, courseId: string): Enrollment | undefined {
    const enrollment = this.state.enrollments.find(
      (e) => e.userId === userId && e.courseId === courseId,
    )
    if (!enrollment) return undefined
    enrollment.progress = this.calcCourseProgress(userId, courseId)
    enrollment.lastAccessedAt = new Date().toISOString()
    this.persist()
    return enrollment
  }

  async login(email: string, password: string): Promise<AuthResult | null> {
    const user = this.findUserByEmail(email)
    if (!user || user.password !== password) return delay(null)
    const session = this.createSession(user.id)
    return delay({ user: omitPassword(user), session })
  }

  async register(input: RegisterInput): Promise<AuthResult> {
    if (this.findUserByEmail(input.email)) {
      throw new Error('این ایمیل قبلاً ثبت شده است')
    }
    const user: User = {
      id: generateId('u'),
      email: input.email,
      password: input.password,
      name: input.name,
      role: input.role,
      plan: input.plan ?? 'free',
      childrenIds: input.role === 'parent' ? [] : undefined,
      createdAt: new Date().toISOString(),
    }
    this.state.users.push(user)
    if (input.role === 'student') {
      this.state.enrollments.push({
        id: generateId('e'),
        userId: user.id,
        courseId: PYTHON_COURSE_ID,
        progress: 0,
        lastAccessedAt: new Date().toISOString(),
      })
      this.state.gameProfiles.push({
        userId: user.id,
        xp: 0,
        level: 1,
        totalQuizzesPassed: 0,
        bestStreak: 0,
      })
    }
    const session = this.createSession(user.id)
    this.persist()
    return delay({ user: omitPassword(user), session })
  }

  async logout(sessionToken: string): Promise<void> {
    this.state.sessions = this.state.sessions.filter(
      (s) => s.token !== sessionToken,
    )
    this.persist()
    return delay(undefined)
  }

  async getSessionUser(
    sessionToken: string,
  ): Promise<Omit<User, 'password'> | null> {
    const session = this.state.sessions.find((s) => s.token === sessionToken)
    if (!session || new Date(session.expiresAt) < new Date()) return delay(null)
    const user = this.state.users.find((u) => u.id === session.userId)
    return delay(user ? omitPassword(user) : null)
  }

  private ensureGameProfile(userId: string): GameProfile {
    let profile = this.state.gameProfiles.find((g) => g.userId === userId)
    if (!profile) {
      profile = {
        userId,
        xp: 0,
        level: 1,
        totalQuizzesPassed: 0,
        bestStreak: 0,
      }
      this.state.gameProfiles.push(profile)
    }
    return profile
  }

  async getGameProfile(userId: string): Promise<GameProfile> {
    return delay({ ...this.ensureGameProfile(userId) })
  }

  async hasPassedQuiz(userId: string, lessonId: string): Promise<boolean> {
    const passed = this.state.quizAttempts.some(
      (a) => a.userId === userId && a.lessonId === lessonId && a.passed,
    )
    return delay(passed)
  }

  async submitQuiz(
    userId: string,
    lessonId: string,
    answers: number[],
  ): Promise<QuizResult> {
    const lesson = this.state.lessons.find((l) => l.id === lessonId)
    if (!lesson?.quiz) throw new Error('کوییز یافت نشد')

    const { quiz } = lesson
    let correctCount = 0
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correctCount++
    })

    const score = Math.round((correctCount / quiz.questions.length) * 100)
    const passed = score >= quiz.passScore
    const profile = this.ensureGameProfile(userId)
    const oldLevel = profile.level

    let xpEarned = 0
    let perfectBonus = false

    if (passed) {
      xpEarned = quiz.xpReward + correctCount * 5
      if (score === 100) {
        perfectBonus = true
        xpEarned += 25
      }
      profile.xp += xpEarned
      profile.level = xpToLevel(profile.xp)
      profile.totalQuizzesPassed += 1

      this.state.quizAttempts.push({
        userId,
        lessonId,
        score,
        passed: true,
        xpEarned,
        completedAt: new Date().toISOString(),
      })

      await this.completeLesson(userId, lessonId)
    } else {
      this.state.quizAttempts.push({
        userId,
        lessonId,
        score,
        passed: false,
        xpEarned: 0,
        completedAt: new Date().toISOString(),
      })
    }

    this.persist()

    return delay({
      passed,
      score,
      correctCount,
      totalQuestions: quiz.questions.length,
      xpEarned,
      profile: { ...profile },
      levelUp: profile.level > oldLevel,
      perfectBonus,
    })
  }

  async getStudentStats(userId: string): Promise<StudentStats> {
    const completed = this.state.lessonProgress.filter(
      (p) => p.userId === userId,
    ).length
    const enrollments = this.state.enrollments.filter((e) => e.userId === userId)
    const avg =
      enrollments.length > 0
        ? Math.round(
            enrollments.reduce(
              (s, e) => s + this.calcCourseProgress(userId, e.courseId),
              0,
            ) / enrollments.length,
          )
        : 0
    const game = this.ensureGameProfile(userId)
    return delay({
      streak: 14,
      weeklyProgress: avg || 0,
      completedLessons: completed,
      badges: game.totalQuizzesPassed + Math.min(completed, 5),
      rank: 128,
      xp: game.xp,
      level: game.level,
      totalQuizzesPassed: game.totalQuizzesPassed,
    })
  }

  async getStudentEnrollments(
    userId: string,
  ): Promise<(Enrollment & { course: Course })[]> {
    const list = this.state.enrollments
      .filter((e) => e.userId === userId)
      .map((e) => {
        const course = this.state.courses.find((c) => c.id === e.courseId)!
        return { ...e, course, progress: this.calcCourseProgress(userId, e.courseId) }
      })
    return delay(list)
  }

  async getAvailableCourses(userId: string): Promise<Course[]> {
    const enrolled = new Set(
      this.state.enrollments
        .filter((e) => e.userId === userId)
        .map((e) => e.courseId),
    )
    return delay(
      this.state.courses.filter((c) => c.isActive && !enrolled.has(c.id)),
    )
  }

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const course = this.state.courses.find((c) => c.slug === slug && c.isActive)
    return delay(course ?? null)
  }

  async getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
    return delay(
      this.state.lessons
        .filter((l) => l.courseId === courseId)
        .sort((a, b) => a.order - b.order),
    )
  }

  async getLessonBySlug(
    courseId: string,
    lessonSlug: string,
  ): Promise<Lesson | null> {
    const lesson = this.state.lessons.find(
      (l) => l.courseId === courseId && l.slug === lessonSlug,
    )
    return delay(lesson ?? null)
  }

  async getLessonProgress(
    userId: string,
    courseId: string,
  ): Promise<LessonProgress[]> {
    const lessonIds = new Set(
      this.state.lessons.filter((l) => l.courseId === courseId).map((l) => l.id),
    )
    return delay(
      this.state.lessonProgress.filter(
        (p) => p.userId === userId && lessonIds.has(p.lessonId),
      ),
    )
  }

  async enrollInCourse(userId: string, courseId: string): Promise<Enrollment> {
    const exists = this.state.enrollments.find(
      (e) => e.userId === userId && e.courseId === courseId,
    )
    if (exists) return delay(exists)
    const enrollment: Enrollment = {
      id: generateId('e'),
      userId,
      courseId,
      progress: 0,
      lastAccessedAt: new Date().toISOString(),
    }
    this.state.enrollments.push(enrollment)
    this.persist()
    return delay(enrollment)
  }

  async completeLesson(userId: string, lessonId: string): Promise<Enrollment> {
    const lesson = this.state.lessons.find((l) => l.id === lessonId)
    if (!lesson) throw new Error('درس یافت نشد')

    if (lesson.quiz) {
      const passed = this.state.quizAttempts.some(
        (a) => a.userId === userId && a.lessonId === lessonId && a.passed,
      )
      if (!passed) throw new Error('ابتدا کوییز را با موفقیت پاس کنید')
    }

    const already = this.state.lessonProgress.find(
      (p) => p.userId === userId && p.lessonId === lessonId,
    )
    if (!already) {
      this.state.lessonProgress.push({
        userId,
        lessonId,
        completedAt: new Date().toISOString(),
      })
    }

    let enrollment = this.state.enrollments.find(
      (e) => e.userId === userId && e.courseId === lesson.courseId,
    )
    if (!enrollment) {
      enrollment = {
        id: generateId('e'),
        userId,
        courseId: lesson.courseId,
        progress: 0,
        lastAccessedAt: new Date().toISOString(),
      }
      this.state.enrollments.push(enrollment)
    }

    this.syncEnrollmentProgress(userId, lesson.courseId)
    const updated = this.state.enrollments.find(
      (e) => e.userId === userId && e.courseId === lesson.courseId,
    )!
    return delay(updated)
  }

  async getChildrenReports(parentId: string): Promise<ChildReport[]> {
    const parent = this.state.users.find((u) => u.id === parentId)
    const childIds = parent?.childrenIds ?? []
    const reports: ChildReport[] = []

    for (const childId of childIds) {
      const student = this.state.users.find((u) => u.id === childId)
      if (!student) continue
      const stats = await this.getStudentStats(childId)
      const enrollments = await this.getStudentEnrollments(childId)
      reports.push({
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          plan: student.plan,
        },
        stats,
        enrollments,
      })
    }
    return delay(reports)
  }

  async getPlatformStats(): Promise<PlatformStats> {
    const users = this.state.users
    const enrollments = this.state.enrollments
    const avg =
      enrollments.length > 0
        ? Math.round(
            enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length,
          )
        : 0
    const paid = users.filter((u) => u.plan !== 'free').length
    return delay({
      totalUsers: users.length,
      students: users.filter((u) => u.role === 'student').length,
      parents: users.filter((u) => u.role === 'parent').length,
      activeCourses: this.state.courses.filter((c) => c.isActive).length,
      avgProgress: avg,
      revenueMonth: paid * 149000,
    })
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return delay(this.state.users.map(omitPassword))
  }

  async getAllCourses(): Promise<Course[]> {
    return delay([...this.state.courses])
  }

  async updateUserPlan(
    userId: string,
    plan: User['plan'],
  ): Promise<Omit<User, 'password'>> {
    const user = this.state.users.find((u) => u.id === userId)
    if (!user) throw new Error('کاربر یافت نشد')
    user.plan = plan
    this.persist()
    return delay(omitPassword(user))
  }

  async toggleCourseActive(
    courseId: string,
    isActive: boolean,
  ): Promise<Course> {
    const course = this.state.courses.find((c) => c.id === courseId)
    if (!course) throw new Error('دوره یافت نشد')
    course.isActive = isActive
    this.persist()
    return delay({ ...course })
  }
}
