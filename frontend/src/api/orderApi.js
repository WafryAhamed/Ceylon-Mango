import api from './axios';

export const orderApi = {
  createOrder: (data) =>
    api.post('/orders', data),

  getUserOrders: () =>
    api.get('/orders/user'),

  getAllOrders: () =>
    api.get('/orders'),

  updateOrderStatus: (id, status) =>
    api.put(`/orders/${id}/status`, null, { params: { status } }),
};
