import api from './axios';

export const cartApi = {
  getCart: () =>
    api.get('/cart'),

  addToCart: (productId, quantity = 1) =>
    api.post('/cart/add', { productId, quantity }),

  updateCart: (productId, quantity) =>
    api.put('/cart/update', { productId, quantity }),

  removeFromCart: (productId) =>
    api.delete(`/cart/remove/${productId}`),

  clearCart: () =>
    api.delete('/cart/clear'),
};
