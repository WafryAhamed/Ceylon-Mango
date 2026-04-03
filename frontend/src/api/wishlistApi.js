import api from './axios';

export const wishlistApi = {
  getWishlist: () =>
    api.get('/wishlist'),

  addToWishlist: (productId) =>
    api.post('/wishlist/add', { productId }),

  removeFromWishlist: (productId) =>
    api.delete(`/wishlist/remove/${productId}`),
};
