import type { Lesson, LessonQuiz } from '../types'

export const ENGLISH_COURSE_ID = 'c-english'

function q(
  id: string,
  question: string,
  options: string[],
  correct: number,
  explanation?: string,
) {
  return { id, question, options, correctIndex: correct, explanation }
}

function quiz(questions: ReturnType<typeof q>[], xp = 50): LessonQuiz {
  return { questions, passScore: 70, xpReward: xp }
}

export const ENGLISH_LESSONS: Lesson[] = [
  // ——— مبتدی ———
  {
    id: 'en-1',
    courseId: ENGLISH_COURSE_ID,
    slug: 'alphabet-greetings',
    order: 1,
    level: 'beginner',
    title: 'الفبا و سلام و احوال‌پرسی',
    summary: 'حروف، Hello و معرفی خود',
    durationMinutes: 10,
    xpReward: 20,
    sections: [
      {
        type: 'text',
        content:
          'انگلیسی ۲۶ حرف دارد. برای شروع: Hello = سلام، Goodbye = خداحافظ، Please = لطفاً، Thank you = ممنون.',
      },
      {
        type: 'vocab',
        title: 'واژه‌های کلیدی',
        content: 'Hello · Hi · Good morning · Good night · Nice to meet you',
      },
      {
        type: 'tip',
        title: 'بازی کلمات',
        content: 'هر روز ۳ کلمه جدید را با صدای بلند تکرار کن — مثل یک مرحله در بازی!',
      },
    ],
    quiz: quiz([
      q('en1-1', 'معنی Hello چیست؟', ['خداحافظ', 'سلام', 'شب بخیر', 'بله'], 1),
      q('en1-2', 'کدام درست است؟', ['Good morning = صبح بخیر', 'Good morning = شب بخیر', 'Good morning = ظهر بخیر', 'Good morning = عصر بخیر'], 0, 'Good morning یعنی صبح بخیر.'),
      q('en1-3', 'برای «خوشوقتم» می‌گوییم:', ['See you', 'Nice to meet you', 'Goodbye', 'Sorry'], 1),
    ]),
  },
  {
    id: 'en-2',
    courseId: ENGLISH_COURSE_ID,
    slug: 'numbers-colors',
    order: 2,
    level: 'beginner',
    title: 'اعداد و رنگ‌ها',
    summary: '۱ تا ۲۰ و رنگ‌های پایه',
    durationMinutes: 12,
    xpReward: 20,
    sections: [
      { type: 'text', content: 'اعداد: one, two, three ... ten. رنگ‌ها: red, blue, green, yellow, black, white.' },
      { type: 'vocab', title: 'جمله نمونه', content: 'I have two red apples. = من دو سیب قرمز دارم.' },
    ],
    quiz: quiz([
      q('en2-1', 'عدد «هفت» به انگلیسی:', ['five', 'six', 'seven', 'eight'], 2),
      q('en2-2', 'معنی blue:', ['قرمز', 'آبی', 'سبز', 'زرد'], 1),
      q('en2-3', 'I have ___ books. (سه کتاب)', ['one', 'two', 'three', 'ten'], 2),
    ]),
  },
  {
    id: 'en-3',
    courseId: ENGLISH_COURSE_ID,
    slug: 'family-daily',
    order: 3,
    level: 'beginner',
    title: 'خانواده و زندگی روزمره',
    summary: 'اعضای خانواده و فعالیت‌های روزانه',
    durationMinutes: 14,
    xpReward: 25,
    sections: [
      { type: 'vocab', title: 'خانواده', content: 'mother, father, sister, brother, family' },
      { type: 'vocab', title: 'روزمره', content: 'eat, drink, sleep, go to school, play games' },
      { type: 'text', content: 'جمله: My mother cooks dinner. My brother plays football.' },
    ],
    quiz: quiz([
      q('en3-1', 'mother یعنی:', ['پدر', 'مادر', 'خواهر', 'برادر'], 1),
      q('en3-2', '«من به مدرسه می‌روم»', ['I go to school', 'I go to sleep', 'I play games', 'I drink water'], 0),
      q('en3-3', 'brother یعنی:', ['خواهر', 'مادر', 'پدر', 'برادر'], 3),
    ]),
  },
  {
    id: 'en-4',
    courseId: ENGLISH_COURSE_ID,
    slug: 'beginner-boss',
    order: 4,
    level: 'beginner',
    title: 'نبرد مبتدی — آزمون جامع',
    summary: 'چالش نهایی سطح مبتدی',
    durationMinutes: 15,
    xpReward: 40,
    sections: [
      {
        type: 'tip',
        title: '🎮 مرحله Boss',
        content: '۵ سوال؛ حداقل ۸۰٪ برای عبور. امتیاز کامل = بونوس XP!',
      },
    ],
    quiz: quiz(
      [
        q('en4-1', 'Thank you =', ['لطفاً', 'ممنون', 'ببخشید', 'خداحافظ'], 1),
        q('en4-2', 'رنگ سبز:', ['red', 'blue', 'green', 'white'], 2),
        q('en4-3', 'ten =', ['۸', '۹', '۱۰', '۱۱'], 2),
        q('en4-4', 'My ___ is kind. (پدر)', ['sister', 'father', 'color', 'school'], 1),
        q('en4-5', 'Good ___ ! (صبح)', ['night', 'morning', 'bye', 'please'], 1),
      ],
      80,
    ),
  },
  // ——— متوسط ———
  {
    id: 'en-5',
    courseId: ENGLISH_COURSE_ID,
    slug: 'past-simple',
    order: 5,
    level: 'intermediate',
    title: 'گذشته ساده (Past Simple)',
    summary: 'کارهای انجام‌شده در گذشته',
    durationMinutes: 16,
    xpReward: 30,
    sections: [
      {
        type: 'text',
        content: 'برای گذشته از فعل + ed استفاده می‌کنیم: walk → walked, play → played. منفی: did not (didn\'t). سوالی: Did you...?',
      },
      { type: 'vocab', title: 'افعال', content: 'visited, watched, studied, played, ate (eat→ate)' },
    ],
    quiz: quiz([
      q('en5-1', 'گذشته play:', ['play', 'played', 'playing', 'plays'], 1),
      q('en5-2', 'I ___ TV yesterday.', ['watch', 'watched', 'watching', 'watches'], 1),
      q('en5-3', 'سوال گذشته:', ['Do you go?', 'Did you go?', 'Are you go?', 'You did go?'], 1),
    ], 55),
  },
  {
    id: 'en-6',
    courseId: ENGLISH_COURSE_ID,
    slug: 'travel-shopping',
    order: 6,
    level: 'intermediate',
    title: 'سفر و خرید',
    summary: 'فرودگاه، هتل و فروشگاه',
    durationMinutes: 14,
    xpReward: 30,
    sections: [
      { type: 'vocab', title: 'سفر', content: 'airport, ticket, passport, hotel, luggage' },
      { type: 'vocab', title: 'خرید', content: 'How much is it? · I\'d like to buy... · expensive · cheap' },
    ],
    quiz: quiz([
      q('en6-1', 'passport یعنی:', ['بلیط', 'گذرنامه', 'چمدان', 'هتل'], 1),
      q('en6-2', '«چقدر قیمتشه؟»', ['Where is it?', 'How much is it?', 'I am fine', 'See you'], 1),
      q('en6-3', 'expensive یعنی:', ['ارزان', 'گران', 'رایگان', 'جدید'], 1),
    ], 55),
  },
  {
    id: 'en-7',
    courseId: ENGLISH_COURSE_ID,
    slug: 'opinions-hobbies',
    order: 7,
    level: 'intermediate',
    title: 'نظرات و سرگرمی‌ها',
    summary: 'بیان علاقه و نظر شخصی',
    durationMinutes: 14,
    xpReward: 30,
    sections: [
      { type: 'text', content: 'I like / I love / I enjoy + فعل-ing: I enjoy reading. I think... = به نظرم...' },
      { type: 'vocab', title: 'سرگرمی', content: 'reading, gaming, swimming, music, coding' },
    ],
    quiz: quiz([
      q('en7-1', 'I enjoy ___ .', ['read', 'reading', 'reads', 'to read'], 1, 'بعد enjoy فعل ing می‌آید.'),
      q('en7-2', '«دوست دارم موسیقی»', ['I like music', 'I am music', 'I music like', 'Music I'], 0),
      q('en7-3', 'I think it is interesting =', ['فکر نمی‌کنم', 'فکر می‌کنم جالبه', 'نمی‌دانم', 'خداحافظ'], 1),
    ], 55),
  },
  {
    id: 'en-8',
    courseId: ENGLISH_COURSE_ID,
    slug: 'intermediate-boss',
    order: 8,
    level: 'intermediate',
    title: 'نبرد متوسط — آزمون جامع',
    summary: 'چالش سطح متوسط',
    durationMinutes: 18,
    xpReward: 50,
    sections: [{ type: 'tip', title: '🎮 Boss Fight', content: '۵ سوال ترکیبی — آماده‌ای؟' }],
    quiz: quiz(
      [
        q('en8-1', 'She ___ pizza last night.', ['eat', 'eats', 'ate', 'eating'], 2),
        q('en8-2', 'hotel =', ['فرودگاه', 'هتل', 'بلیط', 'گذرنامه'], 1),
        q('en8-3', 'I enjoy ___.', ['swim', 'swimming', 'swam', 'swims'], 1),
        q('en8-4', 'cheap =', ['گران', 'ارزان', 'سنگین', 'سریع'], 1),
        q('en8-5', 'Did you ___ homework?', ['do', 'did', 'done', 'doing'], 0),
      ],
      90,
    ),
  },
  // ——— پیشرفته ———
  {
    id: 'en-9',
    courseId: ENGLISH_COURSE_ID,
    slug: 'present-perfect',
    order: 9,
    level: 'advanced',
    title: 'حال کامل (Present Perfect)',
    summary: 'تجربه و اقدامات اخیر',
    durationMinutes: 18,
    xpReward: 35,
    sections: [
      {
        type: 'text',
        content: 'have/has + past participle: I have visited London. She has finished her work. برای تجربه و کارهای تازه.',
      },
      { type: 'vocab', title: 'نمونه', content: 'I have never tried sushi. · Have you ever been to Iran?' },
    ],
    quiz: quiz([
      q('en9-1', 'She ___ her homework.', ['has finished', 'have finished', 'finish', 'finishing'], 0),
      q('en9-2', 'برای تجربه زندگی:', ['Past simple only', 'Present perfect', 'Future', 'No verb'], 1),
      q('en9-3', 'I have ___ been to Paris.', ['ever', 'never', 'always', 'every'], 1, 'never = هرگز نه'),
    ], 60),
  },
  {
    id: 'en-10',
    courseId: ENGLISH_COURSE_ID,
    slug: 'debates',
    order: 10,
    level: 'advanced',
    title: 'بحث و استدلال',
    summary: 'موافقم / مخالفم و دلیل آوردن',
    durationMinutes: 16,
    xpReward: 35,
    sections: [
      { type: 'text', content: 'In my opinion... · I agree/disagree because... · On the other hand... · Furthermore...' },
      { type: 'vocab', title: 'عبارات', content: 'However, Therefore, Although, In conclusion' },
    ],
    quiz: quiz([
      q('en10-1', 'In my opinion =', ['به نظر من', 'خداحافظ', 'سلام', 'فردا'], 0),
      q('en10-2', 'I disagree ___ you.', ['with', 'at', 'on', 'in'], 0, 'disagree with'),
      q('en10-3', 'Although =', ['بنابراین', 'اگرچه', 'سلام', 'بله'], 1),
    ], 60),
  },
  {
    id: 'en-11',
    courseId: ENGLISH_COURSE_ID,
    slug: 'academic-writing',
    order: 11,
    level: 'advanced',
    title: 'نوشتار آکادمیک',
    summary: 'جملات رسمی و ساختار پاراگراف',
    durationMinutes: 18,
    xpReward: 40,
    sections: [
      { type: 'text', content: 'از جملات رسمی استفاده کن: Furthermore, Moreover, In addition. از Contractions در متن رسمی پرهیز کن.' },
      { type: 'tip', title: 'ساختار', content: 'مقدمه → بدنه (۲-۳ دلیل) → نتیجه‌گیری' },
    ],
    quiz: quiz([
      q('en11-1', 'Furthermore =', ['علاوه بر این', 'اما', 'سلام', 'خداحافظ'], 0),
      q('en11-2', 'متن رسمی:', ["can't", 'cannot', "won't use", 'gonna'], 1),
      q('en11-3', 'In conclusion =', ['در نتیجه', 'در ابتدا', 'سلام', 'شاید'], 0),
    ], 65),
  },
  {
    id: 'en-12',
    courseId: ENGLISH_COURSE_ID,
    slug: 'advanced-boss',
    order: 12,
    level: 'advanced',
    title: 'نبرد نهایی — استاد انگلیسی',
    summary: 'آزمون پیشرفته و جایزه طلایی',
    durationMinutes: 20,
    xpReward: 100,
    sections: [
      {
        type: 'tip',
        title: '🏆 مرحله نهایی',
        content: 'با قبولی در این آزمون نشان «استاد انگلیسی» و ۱۰۰ XP جایزه می‌گیری!',
      },
    ],
    quiz: quiz(
      [
        q('en12-1', 'I have lived here ___ 2020.', ['since', 'for', 'at', 'in'], 0, 'since + نقطه زمانی'),
        q('en12-2', 'On the other hand =', ['از طرف دیگر', 'سلام', 'صبح بخیر', 'ممنون'], 0),
        q('en12-3', 'She has ___ the report.', ['wrote', 'written', 'writing', 'write'], 1),
        q('en12-4', 'In my opinion, technology ___ helpful.', ['is', 'are', 'am', 'be'], 0),
        q('en12-5', 'Furthermore, we need ___ research.', ['more', 'many', 'most', 'muchly'], 0),
      ],
      120,
    ),
  },
]
