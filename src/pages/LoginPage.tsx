import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BRAND, DEMO_EMAILS } from '../config/brand'
import { dashboardPath, useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    navigate(dashboardPath(user.role), { replace: true })
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const loggedIn = await login(email, password)
      navigate(dashboardPath(loggedIn.role))
    } catch {
      setError('ایمیل یا رمز عبور اشتباه است')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>ورود به {BRAND.name}</h1>
        <p className="auth-subtitle">خوش برگشتی! ادامه مسیر یادگیریت رو از اینجا شروع کن.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              dir="ltr"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">رمز عبور</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>

        <p className="auth-footer">
          حساب نداری؟ <Link to="/register">ثبت‌نام کن</Link>
        </p>

        <div className="demo-hint">
          <strong>حساب‌های آزمایشی:</strong>
          <br />
          دانش‌آموز: <code>{DEMO_EMAILS.student}</code> / <code>123456</code>
          <br />
          والد: <code>{DEMO_EMAILS.parent}</code> / <code>123456</code>
          <br />
          مدیر: <code>{DEMO_EMAILS.admin}</code> / <code>123456</code>
        </div>
      </div>
    </div>
  )
}
