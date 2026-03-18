import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Try window first (for public pages)
    window.scrollTo(0, 0)

    // Also scroll any main content container (for dashboard pages)
    const main = document.querySelector('main') || 
                 document.querySelector('[data-scroll]') ||
                 document.getElementById('main-content')
    if (main) main.scrollTop = 0
  }, [pathname])

  return null
}