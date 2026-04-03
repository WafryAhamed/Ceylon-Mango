import React, { useCallback, useState, useEffect, createContext, useContext } from 'react';
import { cartApi } from '../api/cartApi';
import { useAuth } from './AuthContext';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAuth();

  // Load cart from backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      cartApi.getCart()
        .then(res => setItems(res.data))
        .catch(() => {}); // Silently fail — use local state
    } else {
      setItems([]);
    }
  }, [isAuthenticated]);

  const addToCart = useCallback((product, quantity = 1) => {
    // Optimistic local update
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Sync with backend
    if (isAuthenticated) {
      const productId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
      cartApi.addToCart(productId, quantity).catch(() => {});
    }
  }, [isAuthenticated]);

  const removeFromCart = useCallback((productId) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));

    if (isAuthenticated) {
      const pid = typeof productId === 'string' ? parseInt(productId) : productId;
      cartApi.removeFromCart(pid).catch(() => {});
    }
  }, [isAuthenticated]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId));
      if (isAuthenticated) {
        const pid = typeof productId === 'string' ? parseInt(productId) : productId;
        cartApi.removeFromCart(pid).catch(() => {});
      }
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    if (isAuthenticated) {
      const pid = typeof productId === 'string' ? parseInt(productId) : productId;
      cartApi.updateCart(pid, quantity).catch(() => {});
    }
  }, [isAuthenticated]);

  const clearCart = useCallback(() => {
    setItems([]);
    if (isAuthenticated) {
      cartApi.clearCart().catch(() => {});
    }
  }, [isAuthenticated]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}