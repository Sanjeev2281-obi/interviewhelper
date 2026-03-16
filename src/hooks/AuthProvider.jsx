import { createContext, useState } from 'react'
import { authService } from '../services/api'

export const AuthContext = createContext(null)

// ✅ Fix 1: Initialize state from localStorage directly in useState
// avoids calling setState inside useEffect body
function getInitialUser() {
  try {
    const stored = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (stored && token) return JSON.parse(stored)
  } catch { /* empty */ }
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)   // ← reads localStorage once, no effect needed
  const [loading] = useState(false)

  const login = async (email, password) => {
    const res = await authService.login(email, password)
    const { token, user: u } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
    return u
  }

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password)
    const { token, user: u } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
    return u
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAdmin: user?.role === 'ADMIN',
    isPro: user?.role === 'PRO'
    }}>
      {children}
    </AuthContext.Provider>
  )
}