import type { Lesson } from '../types'

export const PYTHON_COURSE_ID = 'c-python'

export const PYTHON_LESSONS: Lesson[] = [
  {
    id: 'l-1',
    courseId: PYTHON_COURSE_ID,
    slug: 'welcome',
    order: 1,
    title: 'پایتون چیست و چرا یاد بگیریم؟',
    summary: 'آشنایی با پایتون — اولین برنامه را اجرا کن',
    durationMinutes: 10,
    sections: [
      {
        type: 'text',
        content:
          'پایتون یک زبان برنامه‌نویسی محبوب و مناسب مبتدیان است. در این درس اولین کدت را در محیط زیر می‌نویسی و اجرا می‌کنی — بدون نصب!',
      },
      {
        type: 'tip',
        title: 'نکته',
        content: 'دکمه ▶ اجرا را بزن و خروجی را ببین. می‌توانی کد را تغییر دهی و دوباره تست کنی.',
      },
      {
        type: 'code',
        title: 'اولین برنامه',
        content: `print("سلام رهنا!")
print("من دارم پایتون یاد می‌گیرم")`,
      },
      {
        type: 'playground',
        title: 'امتحان کن!',
        content: `print("سلام رهنا!")
print("من دارم پایتون یاد می‌گیرم")`,
        tests: { expectedIncludes: ['سلام رهنا', 'پایتون'] },
      },
    ],
  },
  {
    id: 'l-2',
    courseId: PYTHON_COURSE_ID,
    slug: 'install',
    order: 2,
    title: 'متغیرها و print',
    summary: 'نام و پیام — اجرا در مرورگر',
    durationMinutes: 12,
    sections: [
      {
        type: 'text',
        content: 'با print خروجی چاپ می‌شود. متغیر مثل یک جعبه برای نگه‌داشتن مقدار است.',
      },
      {
        type: 'code',
        title: 'مثال',
        content: `name = "علی"
age = 15
print("سلام", name)
print("سن من", age, "است")`,
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'نام و سن خودت را در دو خط جدا چاپ کن.',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `name = "اسم تو"
age = 15
print("سلام", name)
print("سن من", age, "سال است")`,
        tests: { expectedIncludes: ['سلام'] },
      },
    ],
  },
  {
    id: 'l-3',
    courseId: PYTHON_COURSE_ID,
    slug: 'variables',
    order: 3,
    title: 'متغیرها و انواع داده',
    summary: 'رشته، عدد، اعشاری و بولین',
    durationMinutes: 15,
    sections: [
      {
        type: 'text',
        content:
          'متغیر جعبه‌ای است برای نگه‌داشتن داده. در پایتون نیازی به تعیین نوع نیست.',
      },
      {
        type: 'code',
        content: `name = "سارا"
age = 15
height = 1.68
is_student = True
print(name, age, height, is_student)`,
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'متغیرهای نام درس، نمره (۰–۲۰) و قبول‌شده (True/False) بساز و چاپ کن.',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `lesson = "پایتون"
score = 18
passed = True
print(lesson, score, passed)`,
        tests: { expectedIncludes: ['True'] },
      },
    ],
  },
  {
    id: 'l-4',
    courseId: PYTHON_COURSE_ID,
    slug: 'input-output',
    order: 4,
    title: 'ورودی و خروجی',
    summary: 'input و print — با ورودی آزمایشی',
    durationMinutes: 14,
    sections: [
      {
        type: 'text',
        content:
          'با input() از کاربر ورودی می‌گیریم. در محیط زیر، هر خط در «ورودی‌های آزمایشی» یک بار به input داده می‌شود.',
      },
      {
        type: 'code',
        content: `name = input("اسمت چیه؟ ")
age = int(input("چند سالته؟ "))
print("سلام", name)
print("سال دیگه", age + 1, "ساله می‌شی")`,
        mockInputs: ['علی', '15'],
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'دو عدد از کاربر بگیر و جمع آن‌ها را چاپ کن.',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `a = int(input("عدد اول: "))
b = int(input("عدد دوم: "))
print("جمع:", a + b)`,
        mockInputs: ['10', '25'],
        tests: { expectedIncludes: ['35'] },
      },
    ],
  },
  {
    id: 'l-5',
    courseId: PYTHON_COURSE_ID,
    slug: 'conditions',
    order: 5,
    title: 'شرط‌ها: if و else',
    summary: 'تصمیم‌گیری در برنامه',
    durationMinutes: 14,
    sections: [
      {
        type: 'text',
        content: 'با if، elif و else بر اساس شرط رفتار متفاوت داریم. تورفتگی در پایتون اجباری است.',
      },
      {
        type: 'code',
        content: `score = int(input("نمره: "))
if score >= 10:
    print("قبول شدی!")
elif score >= 5:
    print("نیاز به تلاش بیشتر")
else:
    print("دوباره تلاش کن")`,
        mockInputs: ['14'],
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'سن را بگیر؛ اگر ۱۳ تا ۱۸ باشد «نوجوان» چاپ کن.',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `age = int(input("سن: "))
if 13 <= age <= 18:
    print("نوجوان")
else:
    print("خارج از بازه نوجوانی")`,
        mockInputs: ['15'],
        tests: { expectedIncludes: ['نوجوان'] },
      },
    ],
  },
  {
    id: 'l-6',
    courseId: PYTHON_COURSE_ID,
    slug: 'loops',
    order: 6,
    title: 'حلقه for و while',
    summary: 'تکرار بدون کپی کردن کد',
    durationMinutes: 16,
    sections: [
      {
        type: 'text',
        content: 'حلقه for با range و while برای تکرار استفاده می‌شود.',
      },
      {
        type: 'code',
        content: `for i in range(1, 6):
    print("شماره", i)

total = 0
for n in range(1, 6):
    total += n
print("جمع ۱ تا ۵:", total)`,
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'جدول ضرب ۷ را چاپ کن (۷×۱ تا ۷×۱۰).',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `for i in range(1, 11):
    print("7 x", i, "=", 7 * i)`,
        tests: { expectedIncludes: ['7 x 7 = 49', '7 x 10 = 70'] },
      },
    ],
  },
  {
    id: 'l-7',
    courseId: PYTHON_COURSE_ID,
    slug: 'functions',
    order: 7,
    title: 'توابع',
    summary: 'def و return',
    durationMinutes: 14,
    sections: [
      {
        type: 'text',
        content: 'تابع بلوک قابل استفاده مجدد از کد است.',
      },
      {
        type: 'code',
        content: `def greet(name):
    return "سلام " + name + "!"

def average(a, b, c):
    return (a + b + c) / 3

print(greet("علی"))
print("میانگین:", average(14, 16, 18))`,
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'تابعی بنویس که دو عدد را بگیرد و بزرگ‌تر را برگرداند.',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `def bigger(a, b):
    if a > b:
        return a
    return b

print(bigger(10, 25))`,
        tests: { expectedIncludes: ['25'] },
      },
    ],
  },
  {
    id: 'l-8',
    courseId: PYTHON_COURSE_ID,
    slug: 'lists',
    order: 8,
    title: 'لیست‌ها',
    summary: 'لیست و حلقه روی آن',
    durationMinutes: 15,
    sections: [
      {
        type: 'text',
        content: 'لیست چند مقدار را در یک متغیر نگه می‌دارد.',
      },
      {
        type: 'code',
        content: `scores = [18, 15, 20, 12]
scores.append(17)
print("تعداد:", len(scores))
print("بیشترین:", max(scores))
print("میانگین:", sum(scores) / len(scores))`,
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'لیست ۵ عدد بساز و میانگین را چاپ کن.',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `nums = [10, 14, 18, 12, 16]
avg = sum(nums) / len(nums)
print("میانگین:", avg)`,
        tests: { expectedIncludes: ['14'] },
      },
    ],
  },
  {
    id: 'l-9',
    courseId: PYTHON_COURSE_ID,
    slug: 'mini-project',
    order: 9,
    title: 'پروژه: ماشین‌حساب',
    summary: 'جمع‌بندی — پروژه تعاملی',
    durationMinutes: 22,
    sections: [
      {
        type: 'text',
        content: 'ماشین‌حساب ساده با توابع و شرط — کد را کامل کن و تست بزن!',
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
      {
        type: 'tip',
        title: 'تبریک!',
        content: 'دوره پایتون را با اجرای واقعی کد تمام کردی. پروژه‌های بیشتر بساز!',
      },
    ],
  },
]
