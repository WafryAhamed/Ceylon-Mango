import api from './axios';

export const userApi = {
  getAll: () =>
    api.get('/users'),

  delete: (id) =>
    api.delete(`/users/${id}`),
};
