import { orderApi } from '../api/orderApi';

// Kept as fallback
export const mockOrders = [];

export async function fetchUserOrders() {
  try {
    const res = await orderApi.getUserOrders();
    return res.data;
  } catch {
    return mockOrders;
  }
}