import api from './api'

export const progressService = {
  // Get all stats + solved IDs for current user
  getStats: () => api.get('/progress/stats'),

  // Toggle a problem solved/unsolved
  toggle: (problemId, problemTitle, difficulty) =>
    api.post('/progress/toggle', { problemId, problemTitle, difficulty }),
}