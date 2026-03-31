export const mockOrders = [{
  id: 'ORD-001',
  date: '2026-03-25',
  status: 'delivered',
  items: [{
    productId: '1',
    name: 'Royal Ceylon Mango',
    price: 24.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&h=100&fit=crop'
  }, {
    productId: '3',
    name: 'Tropical Mango Juice',
    price: 8.99,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=100&h=100&fit=crop'
  }],
  total: 76.95,
  shippingAddress: '42 Palm Avenue, Colombo 07, Sri Lanka',
  paymentMethod: 'Credit Card'
}, {
  id: 'ORD-002',
  date: '2026-03-28',
  status: 'shipped',
  items: [{
    productId: '4',
    name: 'Premium Mango Jam',
    price: 12.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=100&h=100&fit=crop'
  }, {
    productId: '5',
    name: 'Sun-Dried Mango Slices',
    price: 15.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=100&h=100&fit=crop'
  }],
  total: 44.97,
  shippingAddress: '15 Galle Road, Kandy, Sri Lanka',
  paymentMethod: 'Cash on Delivery'
}, {
  id: 'ORD-003',
  date: '2026-03-30',
  status: 'processing',
  items: [{
    productId: '2',
    name: 'Golden Alphonso Mango',
    price: 34.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=100&h=100&fit=crop'
  }],
  total: 34.99,
  shippingAddress: '8 Temple Street, Galle, Sri Lanka',
  paymentMethod: 'Credit Card'
}];