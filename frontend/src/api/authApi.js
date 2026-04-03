import api from './axios';

export const authApi = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),

  adminLogin: (email, password) =>
    api.post('/auth/admin/login', { email, password }),

  getMe: () =>
    api.get('/auth/me'),

  updateProfile: (updates) =>
    api.put('/auth/profile', updates),
};
