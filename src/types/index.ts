export type UserRole = 'student' | 'parent' | 'admin'
export type PlanType = 'free' | 'plus' | 'pro'

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: UserRole
  plan: PlanType
  parentId?: string
  childrenIds?: string[]
  createdAt: string
}

export interface Session {
  userId: string
  token: string
  expiresAt: string
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  category: string
  lessonsCount: number
  durationHours: number
  isActive: boolean
}

export type LessonLevel = 'beginner' | 'intermediate' | 'advanced'

export type LessonSectionType =
  | 'text'
  | 'code'
  | 'tip'
  | 'exercise'
  | 'vocab'
  | 'playground'

export interface PlaygroundTest {
  expectedIncludes?: string[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface LessonQuiz {
  questions: QuizQuestion[]
  passScore: number
  xpReward: number
}

export interface LessonSection {
  type: LessonSectionType
  title?: string
  content: string
  mockInputs?: string[]
  tests?: PlaygroundTest
}

export interface Lesson {
  id: string
  courseId: string
  slug: string
  order: number
  title: string
  summary: string
  durationMinutes: number
  level?: LessonLevel
  sections: LessonSection[]
  quiz?: LessonQuiz
  xpReward?: number
}

export interface GameProfile {
  userId: string
  xp: number
  level: number
  totalQuizzesPassed: number
  bestStreak: number
}

export interface QuizAttempt {
  userId: string
  lessonId: string
  score: number
  passed: boolean
  xpEarned: number
  completedAt: string
}

export interface QuizResult {
  passed: boolean
  score: number
  correctCount: number
  totalQuestions: number
  xpEarned: number
  profile: GameProfile
  levelUp: boolean
  perfectBonus: boolean
}

export interface LessonProgress {
  userId: string
  lessonId: string
  completedAt: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number
  lastAccessedAt: string
}

export interface StudentStats {
  streak: number
  weeklyProgress: number
  completedLessons: number
  badges: number
  rank: number
  xp: number
  level: number
  totalQuizzesPassed: number
}

export interface ChildReport {
  student: Pick<User, 'id' | 'name' | 'email' | 'plan'>
  stats: StudentStats
  enrollments: (Enrollment & { course: Course })[]
}

export interface PlatformStats {
  totalUsers: number
  students: number
  parents: number
  activeCourses: number
  avgProgress: number
  revenueMonth: number
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  role: 'student' | 'parent'
  plan?: PlanType
}

export interface AuthResult {
  user: Omit<User, 'password'>
  session: Session
}
