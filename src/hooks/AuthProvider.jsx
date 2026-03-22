import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)  // ← show nothing until verified

  // ✅ On every page load — verify token with backend
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      try {
        // Call backend to verify token and get fresh user data
       const res = await authService.me()
        setUser(res.data)
      } catch (err) {
        // Token is invalid or expired — force logout
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

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

  // ✅ Show nothing until backend verifies the token
  if (loading) {
    return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'#020408', color:'#4ade80', fontSize:14 }}>Verifying session...</div>
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