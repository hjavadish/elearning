import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS } from '../config/brand'
import { getDatabase } from '../db'
import type { AuthResult, RegisterInput, UserRole } from '../types'

const SESSION_KEY = STORAGE_KEYS.session

type AuthUser = AuthResult['user']

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthUser>
  register: (input: RegisterInput) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getStoredToken(): string | null {
  return localStorage.getItem(SESSION_KEY)
}

function setStoredToken(token: string | null): void {
  if (token) localStorage.setItem(SESSION_KEY, token)
  else localStorage.removeItem(SESSION_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const db = useMemo(() => getDatabase(), [])

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      setLoading(false)
      return
    }
    db.getSessionUser(token)
      .then((u) => setUser(u))
      .finally(() => setLoading(false))
  }, [db])

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await db.login(email, password)
      if (!result) throw new Error('ایمیل یا رمز عبور اشتباه است')
      setStoredToken(result.session.token)
      setUser(result.user)
      return result.user
    },
    [db],
  )

  const register = useCallback(
    async (input: RegisterInput) => {
      const result = await db.register(input)
      setStoredToken(result.session.token)
      setUser(result.user)
    },
    [db],
  )

  const logout = useCallback(async () => {
    const token = getStoredToken()
    if (token) await db.logout(token)
    setStoredToken(null)
    setUser(null)
  }, [db])

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function dashboardPath(role: UserRole): string {
  switch (role) {
    case 'student':
      return '/student'
    case 'parent':
      return '/parent'
    case 'admin':
      return '/admin'
    default:
      return '/'
  }
}
