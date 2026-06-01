import { Link } from 'react-router-dom'
import { BRAND } from '../config/brand'
import '../styles/landing.css'

const features = [
  {
    icon: '🎮',
    title: 'یادگیری بازی‌وار',
    desc: 'کوییز، XP، استریک و ۳ جان — هر درس مثل یک مرحله بازی!',
  },
  {
    icon: '🇬🇧',
    title: 'انگلیسی مبتدی تا پیشرفته',
    desc: '۱۲ درس سطح‌بندی‌شده با کوییز هیجان‌انگیز در هر مرحله.',
  },
  {
    icon: '📱',
    title: 'همه‌جا در دسترس',
    desc: 'موبایل، تبلت و لپ‌تاپ — هر وقت خواستی ادامه بده.',
  },
  {
    icon: '👥',
    title: 'جامعه نوجوانان',
    desc: 'با هم‌سن‌هات گفتگو کن، پروژه بساز و تیم شو.',
  },
  {
    icon: '🎯',
    title: 'مسیر شخصی',
    desc: 'بر اساس علایق و سطحت، برنامه اختصاصی می‌گیری.',
  },
]

const plans = [
  {
    id: 'free',
    name: 'رایگان',
    price: '۰',
    period: 'همیشه رایگان',
    desc: 'شروع کن و با پلتفرم آشنا شو',
    features: [
      'دسترسی به ۳ دوره پایه',
      '۵ آزمون در ماه',
      'انجمن گفتگو',
      'گواهی ساده',
    ],
    cta: 'شروع رایگان',
    highlighted: false,
  },
  {
    id: 'plus',
    name: 'پلاس',
    price: '۱۴۹',
    period: 'هزار تومان / ماه',
    desc: 'محبوب‌ترین انتخاب نوجوانان',
    features: [
      'همه دوره‌ها بدون محدودیت',
      'آزمون و تمرین نامحدود',
      'گواهی معتبر',
      'پشتیبانی اولویت‌دار',
      'دانلود ویدیو برای آفلاین',
    ],
    cta: 'خرید پلاس',
    highlighted: true,
    badge: 'پیشنهاد ویژه',
  },
  {
    id: 'pro',
    name: 'حرفه‌ای',
    price: '۲۹۹',
    period: 'هزار تومان / ماه',
    desc: 'برای کسانی که جدی‌تر یاد می‌گیرند',
    features: [
      'همه امکانات پلاس',
      'منتور اختصاصی هفتگی',
      'پروژه‌های عملی و بازخورد',
      'کارگاه زنده ماهانه',
      'مسیر شغلی و رزومه',
    ],
    cta: 'خرید حرفه‌ای',
    highlighted: false,
  },
]

export function LandingPage() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">ویژه نوجوانان ۱۳ تا ۱۸ سال</span>
            <h1>
              یادگیری آنلاین
              <br />
              <span className="gradient-text">جذاب و هوشمند</span>
            </h1>
            <p className="hero-desc">
              {BRAND.name} همراه یادگیری توئه — از پایتون برای مبتدیان شروع کن.
              درس‌های کوتاه، تمرین عملی و پیشرفت قابل‌پیگیری برای نوجوانان.
            </p>
            <div className="hero-cta">
              <a href="#pricing" className="btn btn-primary btn-lg">
                مشاهده پلن‌ها
              </a>
              <Link to="/register" className="btn btn-outline btn-lg">
                ثبت‌نام رایگان
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>+۱۲,۰۰۰</strong>
                <span>دانش‌آموز فعال</span>
              </div>
              <div>
                <strong>+۸۰</strong>
                <span>دوره تخصصی</span>
              </div>
              <div>
                <strong>۴.۹</strong>
                <span>رضایت کاربران</span>
              </div>
            </div>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="hero-card hero-card--main">
              <div className="hero-card-header">
                <span className="dot dot--green" />
                <span>درس امروز: پایتون — متغیرها</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '72%' }} />
              </div>
              <p className="hero-card-label">پیشرفت هفتگی</p>
              <p className="hero-card-value">۷۲٪</p>
            </div>
            <div className="hero-card hero-card--float hero-card--badge">
              <span>🏆</span>
              <div>
                <strong>نشان طلایی</strong>
                <small>۳ روز پیاپی!</small>
              </div>
            </div>
            <div className="hero-card hero-card--float hero-card--streak">
              <span>🔥</span>
              <div>
                <strong>۱۴ روز</strong>
                <small>استریک یادگیری</small>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="section-title">چرا {BRAND.name}؟</h2>
          <p className="section-desc">
            طراحی شده برای نسل Z — سریع، رنگی و بدون حوصله‌سری
          </p>
          <div className="features-grid">
            {features.map((f) => (
              <article key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="pricing">
          <h2 className="section-title">پلن مناسب خودت رو انتخاب کن</h2>
          <p className="section-desc">
            از رایگان شروع کن؛ هر وقت خواستی ارتقا بده
          </p>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`plan-card ${plan.highlighted ? 'plan-card--highlighted' : ''}`}
              >
                {'badge' in plan && plan.badge && (
                  <span className="plan-badge">{plan.badge}</span>
                )}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.desc}</p>
                <div className="plan-price">
                  <span className="plan-amount">{plan.price}</span>
                  {plan.id !== 'free' && (
                    <span className="plan-currency">هزار تومان</span>
                  )}
                </div>
                <p className="plan-period">{plan.period}</p>
                <ul className="plan-features">
                  {plan.features.map((item) => (
                    <li key={item}>
                      <span className="check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`btn btn-block ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="faq">
          <h2 className="section-title">سوالات پرتکرار</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>آیا برای والدین هم گزارش پیشرفت دارید؟</summary>
              <p>
                بله؛ در پلن پلاس و حرفه‌ای می‌توانید گزارش هفتگی پیشرفت فرزند
                را دریافت کنید.
              </p>
            </details>
            <details className="faq-item">
              <summary>آیا می‌توانم پلن را عوض کنم؟</summary>
              <p>
                هر زمان بخواهید می‌توانید ارتقا یا تنزل دهید. تغییرات از دوره
                بعد اعمال می‌شود.
              </p>
            </details>
            <details className="faq-item">
              <summary>پلن رایگان برای همیشه رایگان است؟</summary>
              <p>
                بله؛ پلن رایگان بدون محدودیت زمانی است و برای آشنایی با پلتفرم
                کافی است.
              </p>
            </details>
          </div>
        </section>

        <section className="cta-banner">
          <h2>همین امروز یادگیری رو شروع کن</h2>
          <p>ثبت‌نام کمتر از یک دقیقه طول می‌کشه — بدون نیاز به کارت بانکی</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            شروع رایگان
          </Link>
        </section>
      </main>

      <footer className="footer">
        <Link to="/" className="logo">
          <span className="logo-icon">ر</span>
          <span>{BRAND.name}</span>
        </Link>
        <p>© ۱۴۰۵ {BRAND.name} — {BRAND.tagline}</p>
        <div className="footer-links">
          <a href="#">قوانین</a>
          <a href="#">حریم خصوصی</a>
          <a href="#">تماس با ما</a>
        </div>
      </footer>
    </>
  )
}
