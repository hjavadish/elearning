/** نام برند — رهنا: کوتاه برای «راهنما»، یعنی همراه یادگیری */
export const BRAND = {
  name: 'رهنا',
  tagline: 'همراه یادگیری نوجوانان',
  domain: 'rahna.ir',
} as const

export const DEMO_EMAILS = {
  student: `student@${BRAND.domain}`,
  parent: `parent@${BRAND.domain}`,
  admin: `admin@${BRAND.domain}`,
} as const

export const STORAGE_KEYS = {
  session: 'rahna_session',
  db: 'rahna_db_v4',
} as const

export const PYTHON_COURSE_SLUG = 'python'
export const ENGLISH_COURSE_SLUG = 'english'

export const LEVEL_LABELS = {
  beginner: 'مبتدی',
  intermediate: 'متوسط',
  advanced: 'پیشرفته',
} as const
