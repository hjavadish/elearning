import { PYTHON_COURSE_ID, PYTHON_LESSONS } from '../../data/python-lessons'
import type {
  Course,
  Enrollment,
  GameProfile,
  Lesson,
  User,
} from '../../types'

export const SEED_USERS: User[] = [
  {
    id: 'u-admin',
    email: 'admin@yadino.ir',
    password: '123456',
    name: 'مدیر سیستم',
    role: 'admin',
    plan: 'pro',
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'u-parent',
    email: 'parent@yadino.ir',
    password: '123456',
    name: 'خانم احمدی',
    role: 'parent',
    plan: 'plus',
    childrenIds: ['u-student'],
    createdAt: '2025-02-01T00:00:00Z',
  },
  {
    id: 'u-student',
    email: 'student@yadino.ir',
    password: '123456',
    name: 'علی احمدی',
    role: 'student',
    plan: 'plus',
    parentId: 'u-parent',
    createdAt: '2025-03-01T00:00:00Z',
  },
]

export const SEED_COURSES: Course[] = [
  {
    id: PYTHON_COURSE_ID,
    slug: 'python',
    title: 'مسیر حرفه‌ای پایتون',
    description:
      'از صفر تا پروژه: ۲۰ درس تعاملی با محیط کدنویسی مرورگر، کوییز، XP و پروژه‌های واقعی.',
    category: 'برنامه‌نویسی',
    lessonsCount: PYTHON_LESSONS.length,
    durationHours: 24,
    isActive: true,
  },
]

export const SEED_ENROLLMENTS: Enrollment[] = [
  {
    id: 'e-1',
    userId: 'u-student',
    courseId: PYTHON_COURSE_ID,
    progress: 15,
    lastAccessedAt: '2026-05-28T10:00:00Z',
  },
]

export const SEED_LESSONS: Lesson[] = [...PYTHON_LESSONS]

export const SEED_GAME_PROFILES: GameProfile[] = [
  {
    userId: 'u-student',
    xp: 85,
    level: 2,
    totalQuizzesPassed: 2,
    bestStreak: 2,
  },
]
