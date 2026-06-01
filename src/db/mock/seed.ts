import { ENGLISH_COURSE_ID, ENGLISH_LESSONS } from '../../data/english-lessons'
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
    title: 'برنامه‌نویسی با پایتون',
    description: 'یادگیری پایتون با تمرین‌های کدنویسی تعاملی و درس‌های گام‌به‌گام.',
    category: 'فناوری',
    lessonsCount: PYTHON_LESSONS.length,
    durationHours: 12,
    isActive: true,
  },
  {
    id: ENGLISH_COURSE_ID,
    slug: 'english',
    title: 'زبان انگلیسی مکالمه',
    description: 'تمرین مکالمه و واژگان انگلیسی برای نوجوانان، همراه با کوییز و امتیاز XP.',
    category: 'زبان',
    lessonsCount: ENGLISH_LESSONS.length,
    durationHours: 15,
    isActive: true,
  },
  {
    id: 'c-math',
    slug: 'math',
    title: 'ریاضیات پایه نوجوانان',
    description: 'مفاهیم پایه ریاضی برای افزایش توان حل مسئله و آمادگی تحصیلی.',
    category: 'ریاضی',
    lessonsCount: 18,
    durationHours: 9,
    isActive: true,
  },
  {
    id: 'c-design',
    slug: 'design',
    title: 'طراحی گرافیک',
    description: 'آشنایی با اصول طراحی گرافیک و ابزارهای بصری ساده.',
    category: 'هنر',
    lessonsCount: 16,
    durationHours: 8,
    isActive: false,
  },
]

export const SEED_ENROLLMENTS: Enrollment[] = [
  {
    id: 'e-1',
    userId: 'u-student',
    courseId: PYTHON_COURSE_ID,
    progress: 72,
    lastAccessedAt: '2026-05-28T10:00:00Z',
  },
  {
    id: 'e-2',
    userId: 'u-student',
    courseId: ENGLISH_COURSE_ID,
    progress: 45,
    lastAccessedAt: '2026-05-27T14:00:00Z',
  },
]

export const SEED_LESSONS: Lesson[] = [...PYTHON_LESSONS, ...ENGLISH_LESSONS]

export const SEED_GAME_PROFILES: GameProfile[] = [
  {
    userId: 'u-student',
    xp: 120,
    level: 2,
    totalQuizzesPassed: 3,
    bestStreak: 2,
  },
]
