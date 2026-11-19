import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { API_URL, getStoredUser, logoutRequest, type StoredUser } from './auth'

type AuthValue = {
  user: StoredUser | null
  loading: boolean
  setUser: (user: StoredUser | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthValue>({
  user: null,
  loading: false,
  setUser: () => {},
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<StoredUser | null>(getStoredUser)
  const [loading, setLoading] = useState(true)

  const setUser = useCallback((next: StoredUser | null) => {
    setUserState(next)
    try {
      if (next) localStorage.setItem('user', JSON.stringify(next))
      else localStorage.removeItem('user')
    } catch {
      return
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}/api/auth/me`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return
        if (data?.success && data.data?.user) setUser(data.data.user)
        else setUser(null)
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [setUser])

  const logout = useCallback(async () => {
    await logoutRequest()
    setUser(null)
  }, [setUser])

  return <AuthContext.Provider value={{ user, loading, setUser, logout }}>{children}</AuthContext.Provider>
}

export const GuestOnly = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}
