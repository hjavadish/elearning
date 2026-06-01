import type {
  AuthResult,
  ChildReport,
  Course,
  Enrollment,
  GameProfile,
  Lesson,
  LessonProgress,
  PlatformStats,
  QuizResult,
  RegisterInput,
  StudentStats,
  User,
} from '../types'

/** قرارداد دیتابیس — پیاده‌سازی واقعی (Prisma، Supabase و …) همین متدها را دارد */
export interface IDatabase {
  // احراز هویت
  login(email: string, password: string): Promise<AuthResult | null>
  register(input: RegisterInput): Promise<AuthResult>
  logout(sessionToken: string): Promise<void>
  getSessionUser(sessionToken: string): Promise<Omit<User, 'password'> | null>

  // دانش‌آموز
  getStudentStats(userId: string): Promise<StudentStats>
  getStudentEnrollments(userId: string): Promise<(Enrollment & { course: Course })[]>
  getAvailableCourses(userId: string): Promise<Course[]>

  // دوره و درس‌ها
  getCourseBySlug(slug: string): Promise<Course | null>
  getLessonsByCourseId(courseId: string): Promise<Lesson[]>
  getLessonBySlug(courseId: string, lessonSlug: string): Promise<Lesson | null>
  getLessonProgress(userId: string, courseId: string): Promise<LessonProgress[]>
  completeLesson(userId: string, lessonId: string): Promise<Enrollment>
  enrollInCourse(userId: string, courseId: string): Promise<Enrollment>
  submitQuiz(userId: string, lessonId: string, answers: number[]): Promise<QuizResult>
  getGameProfile(userId: string): Promise<GameProfile>
  hasPassedQuiz(userId: string, lessonId: string): Promise<boolean>

  // والدین
  getChildrenReports(parentId: string): Promise<ChildReport[]>

  // مدیریت
  getPlatformStats(): Promise<PlatformStats>
  getAllUsers(): Promise<Omit<User, 'password'>[]>
  getAllCourses(): Promise<Course[]>
  updateUserPlan(userId: string, plan: User['plan']): Promise<Omit<User, 'password'>>
  toggleCourseActive(courseId: string, isActive: boolean): Promise<Course>
}
