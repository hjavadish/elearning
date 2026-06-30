import type { Lesson } from '../../types'
import { q, quiz } from './_helpers'

export const PYTHON_COURSE_ID = 'c-python'

export const PYTHON_BEGINNER_LESSONS: Lesson[] = [
  {
    id: 'py-1',
    courseId: PYTHON_COURSE_ID,
    slug: 'welcome',
    order: 1,
    level: 'beginner',
    title: 'پایتون چیست و از کجا شروع کنیم؟',
    summary: 'آشنایی با پایتون، کاربردها و اولین برنامه',
    durationMinutes: 12,
    xpReward: 25,
    sections: [
      {
        type: 'text',
        content:
          'پایتون یک زبان برنامه‌نویسی سطح بالا، خوانا و قدرتمند است. گوگل، اینستاگرام، Spotify و هزاران استارتاپ از پایتون استفاده می‌کنند. برای نوجوانان، پایتون بهترین نقطه شروع است چون شبیه زبان طبیعی نوشته می‌شود و سریع نتیجه می‌بینی.',
      },
      {
        type: 'tip',
        title: 'چرا پایتون؟',
        content:
          'یادگیری سریع · جامعه بزرگ · کاربرد در هوش مصنوعی، بازی‌سازی، وب و اتوماسیون · تقاضای بالا در بازار کار',
      },
      {
        type: 'text',
        title: 'محیط یادگیری رهنا',
        content:
          'در این پلتفرم کد را مستقیم در مرورگر می‌نویسی و با Pyodide اجرا می‌کنی — بدون نصب پایتون روی کامپیوتر. دکمه ▶ اجرا را بزن، خروجی را ببین و کد را تغییر بده.',
      },
      {
        type: 'code',
        title: 'اولین برنامه: Hello World',
        content: `print("سلام دنیا!")
print("من دارم پایتون یاد می‌گیرم 🐍")`,
      },
      {
        type: 'playground',
        title: 'اولین کد تو',
        content: `print("سلام رهنا!")
print("هدف من: برنامه‌نویس شدن")`,
        tests: { expectedIncludes: ['سلام رهنا', 'برنامه'] },
      },
    ],
    quiz: quiz([
      q('py1-1', 'پایتون بیشتر برای چه نوع پروژه‌هایی مناسب است؟', ['فقط طراحی گرافیک', 'وب، داده، هوش مصنوعی و اتوماسیون', 'فقط سخت‌افزار', 'فقط موبایل native'], 1),
      q('py1-2', 'تابع چاپ در پایتون کدام است؟', ['echo()', 'print()', 'write()', 'show()'], 1),
      q('py1-3', 'در رهنا کد پایتون کجا اجرا می‌شود؟', ['فقط روی سرور', 'مستقیم در مرورگر با Pyodide', 'باید حتماً VS Code نصب کنی', 'فقط روی موبایل'], 1),
    ]),
  },
  {
    id: 'py-2',
    courseId: PYTHON_COURSE_ID,
    slug: 'variables-types',
    order: 2,
    level: 'beginner',
    title: 'متغیرها و انواع داده',
    summary: 'str، int، float، bool و نام‌گذاری درست',
    durationMinutes: 18,
    xpReward: 30,
    sections: [
      {
        type: 'text',
        content:
          'متغیر جعبه‌ای است که یک مقدار را نگه می‌دارد. در پایتون نیازی به تعیین نوع نیست — مفسر خودش تشخیص می‌دهد. نام متغیر باید معنادار باشد: score بهتر از x است.',
      },
      {
        type: 'code',
        title: 'انواع پایه',
        content: `name = "سارا"          # str — رشته
age = 15                 # int — عدد صحیح
height = 1.68            # float — اعشاری
is_student = True        # bool — درست/نادرست

print(type(name), type(age))
print(name, age, height, is_student)`,
      },
      {
        type: 'tip',
        title: 'قوانین نام‌گذاری',
        content: 'حروف، عدد و _ مجاز است · با عدد شروع نکن · از کلمات کلیدی مثل if و for استفاده نکن · snake_case ترجیح داده می‌شود (user_name)',
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'متغیرهای lesson_name، score (۰–۲۰) و passed (True/False) بساز و هر سه را در یک خط print کن.',
      },
      {
        type: 'playground',
        title: 'محیط تمرین',
        content: `lesson_name = "پایتون"
score = 19
passed = True
print(lesson_name, score, passed)`,
        tests: { expectedIncludes: ['True', '19'] },
      },
    ],
    quiz: quiz([
      q('py2-1', 'نوع داده True و False چیست؟', ['str', 'int', 'bool', 'float'], 2),
      q('py2-2', 'کدام نام متغیر نامعتبر است؟', ['user_name', 'score2', '2score', 'is_active'], 2, 'نام متغیر نمی‌تواند با عدد شروع شود.'),
      q('py2-3', 'type(3.14) چه چیزی برمی‌گرداند؟', ['int', 'float', 'str', 'bool'], 1),
    ]),
  },
  {
    id: 'py-3',
    courseId: PYTHON_COURSE_ID,
    slug: 'operators',
    order: 3,
    level: 'beginner',
    title: 'عملگرها و عبارات',
    summary: 'ریاضی، مقایسه و منطق در پایتون',
    durationMinutes: 16,
    xpReward: 25,
    sections: [
      {
        type: 'text',
        content:
          'عملگرهای ریاضی: + - * / // % **. عملگرهای مقایسه: == != > < >= <=. عملگرهای منطقی: and or not. اولویت عملگرها مهم است — پرانتز برای وضوح استفاده کن.',
      },
      {
        type: 'code',
        title: 'مثال‌های کاربردی',
        content: `a, b = 17, 5
print("جمع:", a + b)
print("باقیمانده:", a % b)
print("توان:", 2 ** 10)

print(a > b)      # True
print(a == 17)    # True
print(not False)  # True`,
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'سه نمره بگیر و میانگین را با یک عبارت محاسبه و چاپ کن.',
      },
      {
        type: 'playground',
        title: 'میانگین نمرات',
        content: `n1, n2, n3 = 16, 18, 14
average = (n1 + n2 + n3) / 3
print("میانگین:", average)`,
        tests: { expectedIncludes: ['16'] },
      },
    ],
  },
  {
    id: 'py-4',
    courseId: PYTHON_COURSE_ID,
    slug: 'strings',
    order: 4,
    level: 'beginner',
    title: 'کار با رشته‌ها',
    summary: 'الحاق، f-string، متدها و برش',
    durationMinutes: 20,
    xpReward: 30,
    sections: [
      {
        type: 'text',
        content:
          'رشته (str) برای متن است. می‌توانی با + الحاق کنی، اما f-string خواناتر است: f"سلام {name}". متدهای رایج: upper(), lower(), strip(), replace(), split().',
      },
      {
        type: 'code',
        title: 'f-string و متدها',
        content: `name = "علی"
age = 15
msg = f"سلام {name}! تو {age} سالته."
print(msg)

text = "  Python  "
print(text.strip().lower())
print("a,b,c".split(","))`,
      },
      {
        type: 'tip',
        title: 'برش رشته (Slicing)',
        content: 'word[0] اولین کاراکتر · word[-1] آخرین · word[1:4] از index 1 تا 3 · word[:3] سه کاراکتر اول',
      },
      {
        type: 'playground',
        title: 'کارت معرفی',
        content: `name = "مریم"
skill = "پایتون"
print(f"من {name} هستم و {skill} یاد می‌گیرم.")`,
        tests: { expectedIncludes: ['مریم', 'پایتون'] },
      },
    ],
    quiz: quiz([
      q('py4-1', 'کدام روش ساخت رشته با متغیر مدرن‌تر است؟', ['% formatting', 'f-string', 'فقط +', 'هیچ‌کدام'], 1),
      q('py4-2', '"hello".upper() چه برمی‌گرداند؟', ['hello', 'HELLO', 'Hello', 'خطا'], 1),
      q('py4-3', 'f"{2 + 3}" خروجی چیست؟', ['2 + 3', '5', '23', 'خطا'], 1),
    ]),
  },
  {
    id: 'py-5',
    courseId: PYTHON_COURSE_ID,
    slug: 'input-output',
    order: 5,
    level: 'beginner',
    title: 'ورودی و خروجی تعاملی',
    summary: 'input، تبدیل نوع و فرمت خروجی',
    durationMinutes: 18,
    xpReward: 25,
    sections: [
      {
        type: 'text',
        content:
          'input() همیشه رشته برمی‌گرداند. برای عدد از int() یا float() استفاده کن. در محیط رهنا، هر خط در «ورودی‌های آزمایشی» یک بار به input داده می‌شود.',
      },
      {
        type: 'code',
        title: 'ماشین حساب ساده',
        content: `name = input("اسمت چیه؟ ")
age = int(input("سن: "))
print(f"سلام {name}! سال دیگه {age + 1} ساله می‌شی.")

a = float(input("عدد اول: "))
b = float(input("عدد دوم: "))
print("جمع:", a + b)`,
        mockInputs: ['علی', '15', '10', '3.5'],
      },
      {
        type: 'playground',
        title: 'محاسبه BMI ساده',
        content: `weight = float(input("وزن (kg): "))
height = float(input("قد (m): "))
bmi = weight / (height ** 2)
print("BMI:", round(bmi, 1))`,
        mockInputs: ['55', '1.65'],
        tests: { expectedIncludes: ['BMI'] },
      },
    ],
  },
  {
    id: 'py-6',
    courseId: PYTHON_COURSE_ID,
    slug: 'conditions',
    order: 6,
    level: 'beginner',
    title: 'شرط‌ها: if، elif، else',
    summary: 'تصمیم‌گیری و تورفتگی اجباری',
    durationMinutes: 20,
    xpReward: 35,
    sections: [
      {
        type: 'text',
        content:
          'با if برنامه مسیرهای مختلف می‌رود. elif برای چند شرط و else برای حالت پیش‌فرض. در پایتون تورفتگی (معمولاً ۴ فاصله) بلوک کد را مشخص می‌کند — بدون آکولاد!',
      },
      {
        type: 'code',
        title: 'نمره و وضعیت',
        content: `score = int(input("نمره (۰–۲۰): "))

if score >= 17:
    print("عالی! 🌟")
elif score >= 10:
    print("قبول — می‌تونی بهتر شی")
else:
    print("نیاز به تمرین بیشتر")`,
        mockInputs: ['14'],
      },
      {
        type: 'exercise',
        title: 'تمرین',
        content: 'سن را بگیر؛ اگر ۱۳ تا ۱۸ باشد «نوجوان»، کمتر «کودک»، بیشتر «بزرگسال» چاپ کن.',
      },
      {
        type: 'playground',
        title: 'دسته‌بندی سن',
        content: `age = int(input("سن: "))
if age < 13:
    print("کودک")
elif age <= 18:
    print("نوجوان")
else:
    print("بزرگسال")`,
        mockInputs: ['15'],
        tests: { expectedIncludes: ['نوجوان'] },
      },
    ],
    quiz: quiz([
      q('py6-1', 'در پایتون بلوک if با چه چیزی مشخص می‌شود؟', ['آکولاد {}', 'تورفتگی', 'سمی‌کالن ;', 'براکت []'], 1),
      q('py6-2', 'elif چه زمانی اجرا می‌شود؟', ['همیشه', 'وقتی if و elifهای قبل False باشند', 'بعد از else', 'هرگز'], 1),
      q('py6-3', '13 <= age <= 18 در پایتون معتبر است؟', ['بله', 'خیر', 'فقط با and', 'فقط در Python 2'], 0),
    ], 45),
  },
  {
    id: 'py-7',
    courseId: PYTHON_COURSE_ID,
    slug: 'loops-for',
    order: 7,
    level: 'beginner',
    title: 'حلقه for و range',
    summary: 'تکرار روی دنباله و شمارش',
    durationMinutes: 18,
    xpReward: 30,
    sections: [
      {
        type: 'text',
        content:
          'for item in sequence: برای پیمایش لیست، رشته یا range استفاده می‌شود. range(5) اعداد ۰ تا ۴ · range(1, 6) اعداد ۱ تا ۵ · range(0, 10, 2) با گام ۲.',
      },
      {
        type: 'code',
        title: 'جدول ضرب و جمع',
        content: `for i in range(1, 6):
    print("شماره", i)

total = 0
for n in range(1, 101):
    total += n
print("جمع ۱ تا ۱۰۰:", total)

for char in "Python":
    print(char)`,
      },
      {
        type: 'playground',
        title: 'جدول ضرب ۷',
        content: `for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")`,
        tests: { expectedIncludes: ['7 x 7 = 49', '7 x 10 = 70'] },
      },
    ],
  },
  {
    id: 'py-8',
    courseId: PYTHON_COURSE_ID,
    slug: 'loops-while',
    order: 8,
    level: 'beginner',
    title: 'حلقه while و break',
    summary: 'تکرار شرطی و کنترل حلقه',
    durationMinutes: 16,
    xpReward: 25,
    sections: [
      {
        type: 'text',
        content:
          'while تا وقتی شرط True است تکرار می‌کند. break حلقه را می‌شکند، continue به تکرار بعدی می‌رود. مراقب حلقه بی‌نهایت باش!',
      },
      {
        type: 'code',
        title: 'شمارش معکوس',
        content: `count = 5
while count > 0:
    print(count)
    count -= 1
print("پرتاب! 🚀")

# جمع تا رسیدن به حد
total = 0
n = 1
while total < 50:
    total += n
    n += 1
print("اولین n که جمع از ۵۰ گذشت:", n)`,
      },
      {
        type: 'playground',
        title: 'حدس عدد ساده',
        content: `secret = 7
guess = 0
attempts = 0
while guess != secret:
    guess = int(input("حدس بزن (۱–۱۰): "))
    attempts += 1
print("درست! تلاش:", attempts)`,
        mockInputs: ['3', '7'],
        tests: { expectedIncludes: ['درست', '3'] },
      },
    ],
  },
]
