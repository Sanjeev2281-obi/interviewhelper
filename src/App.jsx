import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from "./hooks/AuthProvider"
import { useAuth } from "./hooks/useAuth"

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import ProblemsPage from './pages/ProblemsPage'
import ProblemDetailPage from './pages/ProblemDetailPage'
import MockInterviewPage from './pages/MockInterviewPage'
import ResumeReviewPage from './pages/ResumeReviewPage'
import AIInterviewPage from './pages/AIInterviewPage'
import CompanyQuestionsPage from './pages/CompanyQuestions'
import AdminPage from './pages/AdminPage'
import PricingPage from './pages/PricingPage'
import AppLayout from './components/layout/AppLayout'
import SystemDesignPage from './pages/Systemdesignpage'
import TechQuestionsPage from './pages/TechQuestionsPage'
import DiscussionPage from './pages/DiscussionPage'
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />
  return children
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#e2e8f0',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#1e293b' } }
          }}
        />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="system-design" element={<SystemDesignPage />} />
            <Route path="problems" element={<ProblemsPage />} />
            <Route path="problems/:id" element={<ProblemDetailPage />} />
            <Route path="mock-interview" element={<MockInterviewPage />} />
            <Route path="resume" element={<ResumeReviewPage />} />
            <Route path="ai-interview" element={<AIInterviewPage />} />
            <Route path="companies" element={<CompanyQuestionsPage />} />
            <Route path="tech-questions" element={<TechQuestionsPage />} />
            <Route path="discussions" element={<DiscussionPage />} />
            {/* ✅ Pricing also accessible from inside dashboard */}
            <Route path="pricing" element={<PricingPage />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AppLayout admin /></ProtectedRoute>}>
            <Route index element={<AdminPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}