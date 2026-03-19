import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Code2, PlayCircle, FileText, MessageSquare,
  Building2, LogOut, Menu, Zap, ChevronRight, Shield, MessageCircle,Layers
} from 'lucide-react'
import { useAuth } from "../../hooks/useAuth";
import toast from 'react-hot-toast'
import { Cpu } from 'lucide-react'
import { Lightbulb } from 'lucide-react'  // add Cpu to existing import
const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/dashboard/problems', icon: Code2, label: 'DSA Problems' },
  { to: '/dashboard/mock-interview', icon: PlayCircle, label: 'Mock Interview' },
  { to: '/dashboard/tech-stack',   icon: Layers,   label: 'Tech Stack Guide' },
  
  { to: '/dashboard/resume', icon: FileText, label: 'Resume Review' },
  { to: '/dashboard/companies', icon: Building2, label: 'Company Questions' },
  { to: '/dashboard/system-design', icon: Cpu, label: 'System Design' },
  { to: '/dashboard/tech-questions', icon: Lightbulb, label: 'Tech Questions' },
  {
  to: '/dashboard/discussions',
  icon: MessageCircle,   // import from lucide-react
  label: 'Discussions',
},
{ to: '/dashboard/ai-interview', icon: MessageSquare, label: 'AI Interview' },
]

// ✅ FIXED: Moved outside AppLayout so React doesn't recreate it on every render
function SidebarContent({ user, isAdmin, onClose, onLogout }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg">InterviewPrep</span>
          <span className="font-display font-bold text-brand-400 text-lg -ml-1">AI</span>
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
            onClick={onClose}
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}

        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
            onClick={onClose}
          >
            <Shield size={17} />
            <span>Admin Panel</span>
          </NavLink>
        )}
      </nav>

      {/* Pro Upgrade Banner */}
      {user?.role !== 'PRO' && (
        <div className="mx-4 mb-4 p-4 bg-linear-to-br from-brand-500/10 to-cyan-500/10 border border-brand-500/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-brand-400" />
            <span className="text-xs font-display font-semibold text-brand-400">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-slate-400 mb-3 font-body">Unlock AI features, unlimited mocks & more</p>
          <NavLink to="/pricing" className="flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors">
            Get Pro — ₹499/mo <ChevronRight size={12} />
          </NavLink>
        </div>
      )}

      {/* User */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 py-2 mb-1">
          <div className="w-8 h-8 bg-linear-to-br from-brand-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold font-display">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate font-body">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate font-body">{user?.email}</p>
          </div>
          {user?.role === 'PRO' && (
            <span className="text-[10px] bg-brand-500/20 text-brand-400 border border-brand-500/30 px-1.5 py-0.5 rounded-md font-display font-semibold">PRO</span>
          )}
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-200 text-sm font-body"
        >
          <LogOut size={15} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-surface-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-surface-900 border-r border-white/5 shrink-0">
        <SidebarContent user={user} isAdmin={isAdmin} onClose={() => {}} onLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-surface-900 border-r border-white/5 z-10">
            <SidebarContent user={user} isAdmin={isAdmin} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-surface-900 border-b border-white/5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-base">InterviewPrep<span className="text-brand-400">AI</span></span>
          </div>
          <div className="w-8 h-8 bg-linear-to-br from-brand-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface-950 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}