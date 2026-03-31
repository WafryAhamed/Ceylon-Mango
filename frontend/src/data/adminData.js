export const mockAdminUsers = [{
  id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'customer',
  phone: '+94 77 123 4567',
  joinDate: '2025-08-15',
  orders: 12,
  totalSpent: 489.5,
  status: 'active'
}, {
  id: 'u2',
  name: 'Sarah Silva',
  email: 'sarah@ceylonmango.lk',
  role: 'admin',
  phone: '+94 77 987 6543',
  joinDate: '2024-01-10',
  orders: 0,
  totalSpent: 0,
  status: 'active'
}, {
  id: 'u3',
  name: 'Amal Perera',
  email: 'amal@example.com',
  role: 'customer',
  phone: '+94 71 555 1234',
  joinDate: '2025-11-20',
  orders: 5,
  totalSpent: 187.45,
  status: 'active'
}, {
  id: 'u4',
  name: 'Nisha Fernando',
  email: 'nisha@example.com',
  role: 'customer',
  phone: '+94 76 222 3344',
  joinDate: '2026-01-05',
  orders: 8,
  totalSpent: 312.0,
  status: 'active'
}, {
  id: 'u5',
  name: 'Raj Kumar',
  email: 'raj@example.com',
  role: 'customer',
  phone: '+94 77 888 9900',
  joinDate: '2025-06-30',
  orders: 3,
  totalSpent: 95.97,
  status: 'inactive'
}, {
  id: 'u6',
  name: 'Emily Chen',
  email: 'emily@example.com',
  role: 'customer',
  phone: '+94 71 444 5566',
  joinDate: '2026-02-14',
  orders: 15,
  totalSpent: 623.85,
  status: 'active'
}, {
  id: 'u7',
  name: 'David Bandara',
  email: 'david@example.com',
  role: 'customer',
  phone: '+94 76 111 2233',
  joinDate: '2025-09-01',
  orders: 2,
  totalSpent: 49.98,
  status: 'active'
}, {
  id: 'u8',
  name: 'Priya Jayawardena',
  email: 'priya@example.com',
  role: 'customer',
  phone: '+94 77 666 7788',
  joinDate: '2026-03-01',
  orders: 1,
  totalSpent: 34.99,
  status: 'active'
}];
export const mockAdminOrders = [{
  id: 'ORD-001',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  date: '2026-03-25',
  status: 'delivered',
  items: [{
    name: 'Royal Ceylon Mango',
    quantity: 2,
    price: 24.99
  }, {
    name: 'Tropical Mango Juice',
    quantity: 3,
    price: 8.99
  }],
  total: 76.95,
  paymentMethod: 'Credit Card',
  shippingAddress: '42 Palm Avenue, Colombo 07'
}, {
  id: 'ORD-002',
  customerName: 'Nisha Fernando',
  customerEmail: 'nisha@example.com',
  date: '2026-03-28',
  status: 'shipped',
  items: [{
    name: 'Premium Mango Jam',
    quantity: 1,
    price: 12.99
  }, {
    name: 'Sun-Dried Mango Slices',
    quantity: 2,
    price: 15.99
  }],
  total: 44.97,
  paymentMethod: 'Cash on Delivery',
  shippingAddress: '15 Galle Road, Kandy'
}, {
  id: 'ORD-003',
  customerName: 'Emily Chen',
  customerEmail: 'emily@example.com',
  date: '2026-03-30',
  status: 'processing',
  items: [{
    name: 'Golden Alphonso Mango',
    quantity: 1,
    price: 34.99
  }],
  total: 34.99,
  paymentMethod: 'Credit Card',
  shippingAddress: '8 Temple Street, Galle'
}, {
  id: 'ORD-004',
  customerName: 'Amal Perera',
  customerEmail: 'amal@example.com',
  date: '2026-03-29',
  status: 'pending',
  items: [{
    name: 'Mango Chutney',
    quantity: 3,
    price: 9.99
  }, {
    name: 'Organic Green Mango',
    quantity: 1,
    price: 19.99
  }],
  total: 49.96,
  paymentMethod: 'Credit Card',
  shippingAddress: '22 Lake Road, Colombo 03'
}, {
  id: 'ORD-005',
  customerName: 'Raj Kumar',
  customerEmail: 'raj@example.com',
  date: '2026-03-27',
  status: 'delivered',
  items: [{
    name: 'Mango Nectar Blend',
    quantity: 4,
    price: 6.99
  }],
  total: 27.96,
  paymentMethod: 'Cash on Delivery',
  shippingAddress: '5 Main Street, Negombo'
}, {
  id: 'ORD-006',
  customerName: 'Priya Jayawardena',
  customerEmail: 'priya@example.com',
  date: '2026-03-30',
  status: 'pending',
  items: [{
    name: 'Royal Ceylon Mango',
    quantity: 1,
    price: 24.99
  }, {
    name: 'Mango Smoothie Mix',
    quantity: 1,
    price: 14.99
  }],
  total: 39.98,
  paymentMethod: 'Credit Card',
  shippingAddress: '18 Flower Road, Colombo 07'
}, {
  id: 'ORD-007',
  customerName: 'David Bandara',
  customerEmail: 'david@example.com',
  date: '2026-03-26',
  status: 'cancelled',
  items: [{
    name: 'Crispy Mango Chips',
    quantity: 2,
    price: 11.99
  }],
  total: 23.98,
  paymentMethod: 'Credit Card',
  shippingAddress: '30 Hill Street, Kandy'
}, {
  id: 'ORD-008',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  date: '2026-03-30',
  status: 'processing',
  items: [{
    name: 'Mango Pickle',
    quantity: 2,
    price: 7.99
  }, {
    name: 'Mango Marmalade',
    quantity: 1,
    price: 13.99
  }],
  total: 29.97,
  paymentMethod: 'Cash on Delivery',
  shippingAddress: '42 Palm Avenue, Colombo 07'
}];
export const mockAdminProducts = [{
  id: '1',
  name: 'Royal Ceylon Mango',
  price: 24.99,
  category: 'fresh',
  image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&h=100&fit=crop',
  description: 'Hand-picked premium Ceylon mangoes',
  weight: '1 kg',
  inStock: true,
  stock: 150,
  sales: 342
}, {
  id: '2',
  name: 'Golden Alphonso Mango',
  price: 34.99,
  category: 'fresh',
  image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=100&h=100&fit=crop',
  description: 'The king of mangoes',
  weight: '1 kg',
  inStock: true,
  stock: 85,
  sales: 189
}, {
  id: '3',
  name: 'Tropical Mango Juice',
  price: 8.99,
  category: 'juice',
  image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=100&h=100&fit=crop',
  description: 'Pure cold-pressed mango juice',
  weight: '500ml',
  inStock: true,
  stock: 320,
  sales: 567
}, {
  id: '4',
  name: 'Premium Mango Jam',
  price: 12.99,
  category: 'preserves',
  image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=100&h=100&fit=crop',
  description: 'Artisanal mango jam',
  weight: '350g',
  inStock: true,
  stock: 200,
  sales: 234
}, {
  id: '5',
  name: 'Sun-Dried Mango Slices',
  price: 15.99,
  category: 'dried',
  image: 'https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=100&h=100&fit=crop',
  description: 'Naturally sun-dried mango slices',
  weight: '250g',
  inStock: true,
  stock: 175,
  sales: 298
}, {
  id: '6',
  name: 'Mango Nectar Blend',
  price: 6.99,
  category: 'juice',
  image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=100&h=100&fit=crop',
  description: 'Refreshing mango nectar blend',
  weight: '330ml',
  inStock: true,
  stock: 410,
  sales: 445
}, {
  id: '7',
  name: 'Organic Green Mango',
  price: 19.99,
  category: 'fresh',
  image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=100&h=100&fit=crop',
  description: 'Certified organic green mangoes',
  weight: '1 kg',
  inStock: true,
  stock: 60,
  sales: 112
}, {
  id: '8',
  name: 'Mango Chutney',
  price: 9.99,
  category: 'preserves',
  image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=100&h=100&fit=crop',
  description: 'Traditional Sri Lankan mango chutney',
  weight: '300g',
  inStock: true,
  stock: 190,
  sales: 356
}, {
  id: '9',
  name: 'Mango Smoothie Mix',
  price: 14.99,
  category: 'juice',
  image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=100&h=100&fit=crop',
  description: 'Freeze-dried mango powder',
  weight: '200g',
  inStock: true,
  stock: 95,
  sales: 178
}, {
  id: '10',
  name: 'Mango Pickle',
  price: 7.99,
  category: 'preserves',
  image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=100&h=100&fit=crop',
  description: 'Authentic Sri Lankan mango pickle',
  weight: '400g',
  inStock: true,
  stock: 220,
  sales: 401
}, {
  id: '11',
  name: 'Crispy Mango Chips',
  price: 11.99,
  category: 'dried',
  image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=100&h=100&fit=crop',
  description: 'Vacuum-fried mango chips',
  weight: '150g',
  inStock: true,
  stock: 130,
  sales: 267
}, {
  id: '12',
  name: 'Mango Marmalade',
  price: 13.99,
  category: 'preserves',
  image: 'https://images.unsplash.com/photo-1597528662465-55ece5734101?w=100&h=100&fit=crop',
  description: 'Luxurious mango marmalade',
  weight: '350g',
  inStock: false,
  stock: 0,
  sales: 89
}];