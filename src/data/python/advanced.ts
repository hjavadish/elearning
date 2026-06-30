import type { Lesson } from '../../types'
import { PYTHON_COURSE_ID } from './beginner'
import { q, quiz } from './_helpers'

export const PYTHON_ADVANCED_LESSONS: Lesson[] = [
  {
    id: 'py-15',
    courseId: PYTHON_COURSE_ID,
    slug: 'modules',
    order: 15,
    level: 'advanced',
    title: 'ماژول‌ها و import',
    summary: 'سازماندهی کد و کتابخانه استاندارد',
    durationMinutes: 18,
    xpReward: 35,
    sections: [
      {
        type: 'text',
        content:
          'ماژول فایل .py است. با import math یا from random import randint کتابخانه استاندارد را استفاده می‌کنی. math.sqrt, random.randint, datetime.date.today از پرکاربردترین‌هاست.',
      },
      {
        type: 'code',
        title: 'کتابخانه استاندارد',
        content: `import math
import random

print("جذر ۱۶:", math.sqrt(16))
print("تصادفی ۱–۱۰:", random.randint(1, 10))
print("pi:", round(math.pi, 2))

nums = [3, 1, 4, 1, 5]
print("میانگین:", sum(nums) / len(nums))`,
      },
      {
        type: 'tip',
        title: 'ساختار پروژه',
        content: 'فایل‌های بزرگ را به ماژول‌های کوچک تقسیم کن: utils.py, models.py, main.py',
      },
      {
        type: 'playground',
        title: 'تاس بنداز',
        content: `import random
dice = random.randint(1, 6)
print("نتیجه تاس:", dice)`,
        tests: { expectedIncludes: ['نتیجه'] },
      },
    ],
  },
  {
    id: 'py-16',
    courseId: PYTHON_COURSE_ID,
    slug: 'oop-classes',
    order: 16,
    level: 'advanced',
    title: 'برنامه‌نویسی شیءگرا: class',
    summary: 'class، __init__ و متدها',
    durationMinutes: 24,
    xpReward: 45,
    sections: [
      {
        type: 'text',
        content:
          'class قالب ساخت object است. __init__ سازنده object. self به نمونه فعلی اشاره می‌کند. OOP برای مدل‌سازی دنیای واقعی — Student, Course, Game — عالی است.',
      },
      {
        type: 'code',
        title: 'کلاس Student',
        content: `class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.xp = 0

    def add_xp(self, amount):
        self.xp += amount

    def intro(self):
        return f"{self.name} ({self.age} سال) — XP: {self.xp}"

s = Student("علی", 15)
s.add_xp(50)
print(s.intro())`,
      },
      {
        type: 'playground',
        title: 'کلاس Rectangle',
        content: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

r = Rectangle(4, 5)
print("مساحت:", r.area())`,
        tests: { expectedIncludes: ['20'] },
      },
    ],
    quiz: quiz([
      q('py16-1', '__init__ چه نقشی دارد؟', ['حذف object', 'مقداردهی اولیه object', 'import', 'حلقه'], 1),
      q('py16-2', 'self در متد کلاس به چه اشاره دارد؟', ['کلاس', 'نمونه فعلی', 'ماژول', 'هیچ'], 1),
      q('py16-3', 's = Student("a", 1) چه می‌سازد؟', ['کلاس', 'object (نمونه)', 'تابع', 'ماژول'], 1),
    ], 50),
  },
  {
    id: 'py-17',
    courseId: PYTHON_COURSE_ID,
    slug: 'files',
    order: 17,
    level: 'advanced',
    title: 'کار با فایل (مفاهیم)',
    summary: 'open، with و ذخیره‌سازی داده',
    durationMinutes: 16,
    xpReward: 30,
    sections: [
      {
        type: 'text',
        content:
          'در پایتون دسکتاپ با open("file.txt", "r") می‌خوانی و با "w" می‌نویسی. with open(...) as f: فایل را خودکار می‌بندد. در مرورگر رهنا فایل واقعی نداریم — اما الگو را برای پروژه‌های بعدی یاد بگیر.',
      },
      {
        type: 'code',
        title: 'الگوی خواندن/نوشتن',
        content: `# روی کامپیوتر خودت:
# with open("notes.txt", "w", encoding="utf-8") as f:
#     f.write("یادداشت اول\\n")

# with open("notes.txt", "r", encoding="utf-8") as f:
#     content = f.read()
#     print(content)

# شبیه‌سازی در حافظه:
lines = ["درس ۱: متغیرها", "درس ۲: حلقه"]
text = "\\n".join(lines)
print(text)`,
      },
      {
        type: 'tip',
        title: 'JSON',
        content: 'import json — json.dumps(dict) برای ذخیره dict به رشته · json.loads برای بارگذاری',
      },
    ],
  },
  {
    id: 'py-18',
    courseId: PYTHON_COURSE_ID,
    slug: 'project-calculator',
    order: 18,
    level: 'advanced',
    title: 'پروژه: ماشین‌حساب حرفه‌ای',
    summary: 'جمع‌بندی توابع، شرط و ورودی',
    durationMinutes: 28,
    xpReward: 55,
    sections: [
      {
        type: 'text',
        content:
          'در این پروژه ماشین‌حسابی می‌سازی که چهار عمل اصلی را با منوی متنی انجام می‌دهد. از توابع جدا برای هر عمل استفاده کن — الگوی حرفه‌ای.',
      },
      {
        type: 'code',
        title: 'ساختار پیشنهادی',
        content: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "خطا: تقسیم بر صفر"
    return a / b

# منو: 1=جمع 2=تفریق 3=ضرب 4=تقسیم`,
      },
      {
        type: 'playground',
        title: 'ماشین‌حساب تو',
        content: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

choice = input("1=جمع 2=تفریق: ")
a = float(input("عدد اول: "))
b = float(input("عدد دوم: "))

if choice == "1":
    print("نتیجه:", add(a, b))
elif choice == "2":
    print("نتیجه:", subtract(a, b))
else:
    print("گزینه نامعتبر")`,
        mockInputs: ['1', '10', '3'],
        tests: { expectedIncludes: ['13'] },
      },
    ],
  },
  {
    id: 'py-19',
    courseId: PYTHON_COURSE_ID,
    slug: 'project-guess-game',
    order: 19,
    level: 'advanced',
    title: 'پروژه: بازی حدس عدد',
    summary: 'while، random و UX ساده',
    durationMinutes: 30,
    xpReward: 60,
    sections: [
      {
        type: 'text',
        content:
          'بازی کلاسیک: کامپیuter عدد ۱–۱۰۰ را انتخاب می‌کند، کاربر حدس می‌زند، راهنمایی «بزرگ‌تر» یا «کوچک‌تر» می‌گیرد. از random.randint و while استفاده کن.',
      },
      {
        type: 'playground',
        title: 'بازی حدس (نسخه کوتاه)',
        content: `import random
secret = random.randint(1, 10)
guess = 0
while guess != secret:
    guess = int(input("حدس (۱–۱۰): "))
    if guess < secret:
        print("بزرگ‌تر!")
    elif guess > secret:
        print("کوچک‌تر!")
print("برنده شدی! 🎉")`,
        mockInputs: ['3', '7', '5'],
        tests: { expectedIncludes: ['برنده'] },
      },
    ],
    quiz: quiz([
      q('py19-1', 'random.randint(1, 10) چه برمی‌گرداند؟', ['همیشه ۵', 'عدد صحیح تصادفی ۱ تا ۱۰', 'اعشاری', 'رشته'], 1),
      q('py19-2', 'در بازی حدس، while تا کی ادامه دارد؟', ['۱ بار', 'تا حدس درست', 'بی‌نهایت همیشه', '۱۰ بار'], 1),
    ], 40),
  },
  {
    id: 'py-20',
    courseId: PYTHON_COURSE_ID,
    slug: 'project-todo',
    order: 20,
    level: 'advanced',
    title: 'پروژه نهایی: لیست کارها (Todo)',
    summary: 'لیست، حلقه و منوی تعاملی — فارغ‌التحصیلی!',
    durationMinutes: 35,
    xpReward: 80,
    sections: [
      {
        type: 'text',
        content:
          'پروژه capstone: برنامه‌ای با منو که کار اضافه، نمایش و حذف کند. همه مفاهیم دوره — list, dict, while, functions — اینجا جمع می‌شوند. بعد از این درس، آماده پروژه‌های واقعی و یادگیری Flask/Django یا Data Science هستی.',
      },
      {
        type: 'code',
        title: 'الگوی معماری',
        content: `tasks = []

def show_tasks():
    for i, task in enumerate(tasks, 1):
        print(f"{i}. {task}")

def add_task(title):
    tasks.append(title)
    print("اضافه شد ✓")

# منو: 1=نمایش 2=اضافه 3=خروج
# while True: ...`,
      },
      {
        type: 'playground',
        title: 'Todo ساده',
        content: `tasks = ["تمرین پایتون", "خواندن درس"]
tasks.append("پروژه نهایی")
for i, t in enumerate(tasks, 1):
    print(f"{i}. {t}")
print("تعداد:", len(tasks))`,
        tests: { expectedIncludes: ['پروژه نهایی', '3'] },
      },
      {
        type: 'tip',
        title: 'تبریک! 🎓',
        content:
          'مسیر مبتدی تا پیشرفته پایتون را تمام کردی. قدم بعد: پروژه GitHub، کتاب Automate the Boring Stuff، یا دوره‌های وب و داده. ادامه بده!',
      },
    ],
    quiz: quiz([
      q('py20-1', 'برای نگه‌داشتن چند کار از چه ساختار استفاده کردیم؟', ['tuple', 'list', 'int', 'bool'], 1),
      q('py20-2', 'enumerate(list, 1) چه می‌دهد؟', ['فقط index', 'جفت (شماره از ۱، مقدار)', 'sort', 'خطا'], 1),
      q('py20-3', 'قدم منطقی بعد از این دوره کدام است؟', ['ترک برنامه‌نویسی', 'پروژه واقعی و تخصص (وب/داده/AI)', 'فقط تکرار درس ۱', 'فقط HTML'], 1),
    ], 80),
  },
]
