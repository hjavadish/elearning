import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardPath, useAuth } from '../context/AuthContext'
import type { PlanType } from '../types'
import '../styles/auth.css'

export function RegisterPage() {
  const { register, user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'parent'>('student')
  const [plan, setPlan] = useState<PlanType>('free')
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
      await register({ name, email, password, role, plan })
      navigate(dashboardPath(role))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ثبت‌نام')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>ثبت‌نام در یادینو</h1>
        <p className="auth-subtitle">کمتر از یک دقیقه — رایگان شروع کن</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>نوع حساب</label>
            <div className="role-picker">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                <strong>دانش‌آموز</strong>
                <small>۱۳ تا ۱۸ سال</small>
              </label>
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="parent"
                  checked={role === 'parent'}
                  onChange={() => setRole('parent')}
                />
                <strong>والدین</strong>
                <small>پیگیری فرزند</small>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              minLength={6}
              required
              dir="ltr"
            />
          </div>
          <div className="form-group">
            <label htmlFor="plan">پلن اولیه</label>
            <select
              id="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value as PlanType)}
            >
              <option value="free">رایگان</option>
              <option value="plus">پلاس</option>
              <option value="pro">حرفه‌ای</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? 'در حال ثبت‌نام...' : 'ایجاد حساب'}
          </button>
        </form>

        <p className="auth-footer">
          قبلاً ثبت‌نام کردی؟ <Link to="/login">ورود</Link>
        </p>
      </div>
    </div>
  )
}
