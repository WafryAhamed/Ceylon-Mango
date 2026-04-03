import { productApi } from '../api/productApi';

// Keep static fallback data for initial render / offline
export const categories = [
  {
    id: 'fresh',
    name: 'Fresh Mangoes',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
    count: 8,
  },
  {
    id: 'juice',
    name: 'Mango Juices',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop',
    count: 5,
  },
  {
    id: 'dried',
    name: 'Dried Mango',
    image: 'https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=400&h=300&fit=crop',
    count: 4,
  },
  {
    id: 'preserves',
    name: 'Jams & Preserves',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    count: 6,
  },
];

// In-memory cache for products fetched from API
let _productsCache = null;

export async function fetchProducts() {
  try {
    const res = await productApi.getAll();
    _productsCache = res.data;
    return res.data;
  } catch {
    return _productsCache || [];
  }
}

export async function fetchProductById(id) {
  try {
    const res = await productApi.getById(id);
    return res.data;
  } catch {
    // Fallback to cache
    if (_productsCache) {
      return _productsCache.find(p => p.id === id || p.id === String(id));
    }
    return null;
  }
}

export async function fetchProductsByCategory(category) {
  try {
    if (category === 'all') {
      return await fetchProducts();
    }
    const res = await productApi.getAll({ category });
    return res.data;
  } catch {
    if (_productsCache) {
      if (category === 'all') return _productsCache;
      return _productsCache.filter(p => p.category === category);
    }
    return [];
  }
}

export async function fetchFeaturedProducts() {
  try {
    const res = await productApi.getFeatured();
    return res.data;
  } catch {
    if (_productsCache) {
      return _productsCache.filter(p => p.featured);
    }
    return [];
  }
}

// Synchronous getters that use the cache (for components that haven't migrated to async yet)
// These are kept for backward compatibility with existing static imports
export let products = [];

// Initialize products on load
fetchProducts().then(data => {
  products = data;
});

export const getProductById = (id) => {
  return products.find(p => p.id === id || p.id === String(id));
};

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured);
};