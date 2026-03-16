import { createContext, useState ,useEffect} from 'react'
import { authService } from '../services/api'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

function getInitialUser() {
  try {
    const stored = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (stored && token) return JSON.parse(stored)
  } catch (err) {
    console.error("Failed to parse user", err)
  }
  return null
}
export function AuthProvider({ children }) {

  const [user, setUser] = useState(getInitialUser)
  const [loading] = useState(false)

  useEffect(() => {
  const checkUser = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await authService.me()
      const updatedUser = res.data

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

    // eslint-disable-next-line no-unused-vars
    } catch (err)
    {
      console.error("User refresh failed")
    }
  }

  checkUser()
}, [])
  // ✅ MOVE refreshUser HERE
  const refreshUser = async () => {
    try {
      const res = await authService.me()
      const updatedUser = res.data

      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)

    } catch (err) {
      console.error("Failed to refresh user", err)
    }
  }

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
      refreshUser,
      loading,
      isAdmin: user?.role === 'ADMIN',
      isPro: user?.role === 'PRO'
    }}>
      {children}
    </AuthContext.Provider>
  )
}