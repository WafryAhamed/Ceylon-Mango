import api from './axios';

export const productApi = {
  getAll: (params) =>
    api.get('/products', { params }),

  getFeatured: () =>
    api.get('/products/featured'),

  getById: (id) =>
    api.get(`/products/${id}`),

  create: (data) =>
    api.post('/products', data),

  update: (id, data) =>
    api.put(`/products/${id}`, data),

  delete: (id) =>
    api.delete(`/products/${id}`),
};
