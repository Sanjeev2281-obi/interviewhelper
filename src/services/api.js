import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor — attach JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle 401
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ────────────────────────────────────────────────
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  me: () => api.get('/auth/me'),
}

// ─── Problems ────────────────────────────────────────────
export const problemService = {
  getAll: (params) => api.get('/problems', { params }),
  getById: (id) => api.get(`/problems/${id}`),
  getDaily: () => api.get('/problems/daily'),
  markSolved: (id) => api.post(`/problems/${id}/solve`),
  saveLater: (id) => api.post(`/problems/${id}/save`),
  create: (data) => api.post('/problems', data),
  update: (id, data) => api.put(`/problems/${id}`, data),
  delete: (id) => api.delete(`/problems/${id}`),
}

// ─── Dashboard ───────────────────────────────────────────
export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getProgress: () => api.get('/dashboard/progress'),
  getRoadmap: () => api.get('/dashboard/roadmap'),
}

// ─── Mock Interview ───────────────────────────────────────
export const mockInterviewService = {
  start: () => api.post('/mock-interviews/start'),
  submit: (id, answers) => api.post(`/mock-interviews/${id}/submit`, { answers }),
  getHistory: () => api.get('/mock-interviews/history'),
  getById: (id) => api.get(`/mock-interviews/${id}`),
}

// ─── Resume ───────────────────────────────────────────────
export const resumeService = {
  review: (formData) => api.post('/resume/review', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getHistory: () => api.get('/resume/history'),
}

// ─── AI Interview ─────────────────────────────────────────
export const aiInterviewService = {
  chat: (messages, sessionId) => api.post('/ai-interview/chat', { messages, sessionId }),
  startSession: (type) => api.post('/ai-interview/session', { type }),
}

// ─── Company Questions ────────────────────────────────────
export const companyService = {
  getQuestions: (company, params) => api.get(`/company-questions/${company}`, { params }),
  getCompanies: () => api.get('/company-questions/companies'),
}

// ─── Subscription ─────────────────────────────────────────
export const subscriptionService = {
  getPlans: () => api.get('/subscriptions/plans'),
  subscribe: (plan) => api.post('/subscriptions/subscribe', { plan }),
  getStatus: () => api.get('/subscriptions/status'),
}

// ─── Admin ────────────────────────────────────────────────
export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
}

export default api