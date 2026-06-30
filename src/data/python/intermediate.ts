import type { Lesson } from '../../types'
import { PYTHON_COURSE_ID } from './beginner'
import { q, quiz } from './_helpers'

export const PYTHON_INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 'py-9',
    courseId: PYTHON_COURSE_ID,
    slug: 'functions',
    order: 9,
    level: 'intermediate',
    title: 'توابع: def، پارامتر و return',
    summary: 'کد تمیز، قابل استفاده مجدد و مستند',
    durationMinutes: 22,
    xpReward: 40,
    sections: [
      {
        type: 'text',
        content:
          'تابع بلوک نام‌دار از کد است که با def تعریف می‌شود. پارامترها ورودی، return خروجی. docstring با """ توضیح تابع را می‌نویسد. توابع کد را DRY (Don\'t Repeat Yourself) نگه می‌دارند.',
      },
      {
        type: 'code',
        title: 'توابع پایه',
        content: `def greet(name):
    """سلام گفتن به کاربر"""
    return f"سلام {name}!"

def average(a, b, c):
    return (a + b + c) / 3

def bigger(a, b):
    if a > b:
        return a
    return b

print(greet("علی"))
print("میانگین:", average(14, 16, 18))
print("بزرگ‌تر:", bigger(10, 25))`,
      },
      {
        type: 'tip',
        title: 'پارامتر پیش‌فرض',
        content: 'def power(base, exp=2): — exp اختیاری است و پیش‌فرض ۲ دارد.',
      },
      {
        type: 'playground',
        title: 'تابع مساحت',
        content: `def rectangle_area(width, height):
    return width * height

print("مساحت:", rectangle_area(5, 8))`,
        tests: { expectedIncludes: ['40'] },
      },
    ],
    quiz: quiz([
      q('py9-1', 'کلمه کلیدی تعریف تابع چیست؟', ['func', 'def', 'function', 'fn'], 1),
      q('py9-2', 'تابعی بدون return چه برمی‌گرداند؟', ['0', 'None', 'False', 'خطا'], 1),
      q('py9-3', 'docstring برای چیست؟', ['تزئین', 'مستندسازی تابع', 'کامنت غیرفعال', 'import'], 1),
    ], 45),
  },
  {
    id: 'py-10',
    courseId: PYTHON_COURSE_ID,
    slug: 'lists',
    order: 10,
    level: 'intermediate',
    title: 'لیست‌ها: ساخت، تغییر و متدها',
    summary: 'append، insert، pop و پیمایش',
    durationMinutes: 20,
    xpReward: 35,
    sections: [
      {
        type: 'text',
        content:
          'لیست ordered و mutable است. اندیس از ۰ شروع می‌شود. متدهای مهم: append, extend, insert, remove, pop, sort, reverse. len(), min(), max(), sum() روی لیست عددی کار می‌کنند.',
      },
      {
        type: 'code',
        title: 'مدیریت نمرات',
        content: `scores = [18, 15, 20, 12]
scores.append(17)
scores.sort(reverse=True)

print("تعداد:", len(scores))
print("بیشترین:", max(scores))
print("میانگین:", sum(scores) / len(scores))

for i, score in enumerate(scores):
    print(f"#{i + 1}: {score}")`,
      },
      {
        type: 'playground',
        title: 'فیلتر قبول‌شدگان',
        content: `scores = [8, 12, 15, 19, 6, 14]
passed = []
for s in scores:
    if s >= 10:
        passed.append(s)
print("قبول‌شدگان:", passed)`,
        tests: { expectedIncludes: ['12', '15'] },
      },
    ],
  },
  {
    id: 'py-11',
    courseId: PYTHON_COURSE_ID,
    slug: 'dictionaries',
    order: 11,
    level: 'intermediate',
    title: 'دیکشنری‌ها',
    summary: 'کلید-مقدار، JSON و جستجو',
    durationMinutes: 22,
    xpReward: 40,
    sections: [
      {
        type: 'text',
        content:
          'dict برای نگهداری جفت کلید-مقدار است — مثل یک فرهنگ لغت. کلیدها معمولاً str هستند. user["name"] یا user.get("name", "مهمان") برای دسترسی امن.',
      },
      {
        type: 'code',
        title: 'پروفایل کاربر',
        content: `user = {
    "name": "علی",
    "age": 15,
    "skills": ["Python", "HTML"],
}

print(user["name"])
print(user.get("city", "نامشخص"))

for key, value in user.items():
    print(key, "=>", value)`,
      },
      {
        type: 'playground',
        title: 'دفترچه تلفن',
        content: `phonebook = {"علی": "0912", "سارا": "0935"}
name = input("نام: ")
print("شماره:", phonebook.get(name, "یافت نشد"))`,
        mockInputs: ['علی'],
        tests: { expectedIncludes: ['0912'] },
      },
    ],
    quiz: quiz([
      q('py11-1', 'دیکشنری چه ساختاری دارد؟', ['فقط عدد', 'کلید-مقدار', 'فقط رشته', 'گراف'], 1),
      q('py11-2', 'get(key, default) چه می‌کند؟', ['کلید را حذف می‌کند', 'اگر کلید نبود default برمی‌گرداند', 'لیست می‌سازد', 'sort می‌کند'], 1),
      q('py11-3', 'for k, v in d.items(): چه می‌کند؟', ['فقط کلیدها', 'کلید و مقدار را پیمایش می‌کند', 'خطا می‌دهد', 'فقط مقادیر'], 1),
    ]),
  },
  {
    id: 'py-12',
    courseId: PYTHON_COURSE_ID,
    slug: 'tuples-sets',
    order: 12,
    level: 'intermediate',
    title: 'تاپل و مجموعه (set)',
    summary: 'داده‌های ثابت و یکتا',
    durationMinutes: 16,
    xpReward: 30,
    sections: [
      {
        type: 'text',
        content:
          'tuple مثل لیست اما immutable — برای مختصات (x, y) مناسب است. set عناصر یکتا نگه می‌دارد و برای حذف تکراری‌ها عالی است.',
      },
      {
        type: 'code',
        title: 'مثال‌ها',
        content: `point = (10, 20)
x, y = point  # unpacking
print(x, y)

tags = {"python", "code", "python", "fun"}
print(tags)  # تکراری حذف می‌شود

a = {1, 2, 3}
b = {2, 3, 4}
print("اشتراک:", a & b)
print("اجتماع:", a | b)`,
      },
      {
        type: 'playground',
        title: 'حذف تکراری',
        content: `words = ["a", "b", "a", "c", "b", "d"]
unique = list(set(words))
unique.sort()
print(unique)`,
        tests: { expectedIncludes: ['a', 'd'] },
      },
    ],
  },
  {
    id: 'py-13',
    courseId: PYTHON_COURSE_ID,
    slug: 'comprehensions',
    order: 13,
    level: 'intermediate',
    title: 'List Comprehension',
    summary: 'ساخت لیست فشرده و پایتونیک',
    durationMinutes: 18,
    xpReward: 35,
    sections: [
      {
        type: 'text',
        content:
          'List comprehension روش کوتاه برای ساخت لیست از حلقه است: [x * 2 for x in range(5)]. می‌توان شرط اضافه کرد: [x for x in nums if x > 0].',
      },
      {
        type: 'code',
        title: 'مثال‌های حرفه‌ای',
        content: `# مربع اعداد
squares = [n ** 2 for n in range(1, 6)]
print(squares)

# فقط زوج‌ها
evens = [n for n in range(20) if n % 2 == 0]
print(evens[:5])

# dict comprehension
word_lens = {w: len(w) for w in ["python", "code", "rahna"]}
print(word_lens)`,
      },
      {
        type: 'playground',
        title: 'نمرات بالای ۱۰',
        content: `scores = [5, 12, 18, 7, 20, 9, 15]
high = [s for s in scores if s >= 10]
print(high)`,
        tests: { expectedIncludes: ['12', '20'] },
      },
    ],
  },
  {
    id: 'py-14',
    courseId: PYTHON_COURSE_ID,
    slug: 'errors',
    order: 14,
    level: 'intermediate',
    title: 'مدیریت خطا: try و except',
    summary: 'برنامه مقاوم در برابر ورودی بد',
    durationMinutes: 18,
    xpReward: 35,
    sections: [
      {
        type: 'text',
        content:
          'خطاها طبیعی‌اند. try/except از crash جلوگیری می‌کند. ValueError برای تبدیل نامعتبر، ZeroDivisionError برای تقسیم بر صفر، KeyError برای کلید ناموجود در dict.',
      },
      {
        type: 'code',
        title: 'ورودی امن',
        content: `def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None

def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "تقسیم بر صفر!"

print(safe_int("42"))
print(safe_int("abc"))
print(divide(10, 0))`,
      },
      {
        type: 'playground',
        title: 'تبدیل امن',
        content: `raw = input("عدد: ")
try:
    n = int(raw)
    print("دو برابر:", n * 2)
except ValueError:
    print("عدد معتبر وارد کن")`,
        mockInputs: ['abc'],
        tests: { expectedIncludes: ['معتبر'] },
      },
    ],
    quiz: quiz([
      q('py14-1', 'try/except برای چیست؟', ['سرعت بیشتر', 'مدیریت خطا', 'حلقه', 'import'], 1),
      q('py14-2', 'int("hello") چه خطایی می‌دهد؟', ['SyntaxError', 'ValueError', 'TypeError', 'خطا نمی‌دهد'], 1),
      q('py14-3', 'finally چه زمانی اجرا می‌شود؟', ['فقط در خطا', 'همیشه', 'هرگز', 'فقط در موفقیت'], 1),
    ]),
  },
]
