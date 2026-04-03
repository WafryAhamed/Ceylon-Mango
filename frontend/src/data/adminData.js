import { userApi } from '../api/userApi';
import { orderApi } from '../api/orderApi';
import { productApi } from '../api/productApi';

// Empty defaults for fallback
export const mockAdminUsers = [];
export const mockAdminOrders = [];
export const mockAdminProducts = [];

export async function fetchAdminUsers() {
  try {
    const res = await userApi.getAll();
    return res.data;
  } catch {
    return mockAdminUsers;
  }
}

export async function fetchAdminOrders() {
  try {
    const res = await orderApi.getAllOrders();
    return res.data;
  } catch {
    return mockAdminOrders;
  }
}

export async function fetchAdminProducts() {
  try {
    const res = await productApi.getAll();
    return res.data.map(p => ({
      ...p,
      stock: p.stock || 0,
      sales: p.sales || 0,
    }));
  } catch {
    return mockAdminProducts;
  }
}