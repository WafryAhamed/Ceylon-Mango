import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PackageIcon, ShoppingCartIcon, DollarSignIcon, UsersIcon, TrendingUpIcon, ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { orderApi } from '../api/orderApi';
import { userApi } from '../api/userApi';

const statusColors = {
  pending: {
    bg: 'bg-[#EFB806]/20',
    text: 'text-[#EFB806]'
  },
  processing: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400'
  },
  shipped: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400'
  },
  delivered: {
    bg: 'bg-[#3B653D]/20',
    text: 'text-[#3B653D]'
  },
  cancelled: {
    bg: 'bg-red-500/20',
    text: 'text-red-400'
  }
};
export function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productApi.getAll().then(res => res.data.map(p => ({ ...p, stock: p.stock || 0, sales: p.sales || 0 }))),
      orderApi.getAllOrders().then(res => res.data),
      userApi.getAll().then(res => res.data)
    ]).then(([pData, oData, uData]) => {
      setProducts(pData);
      setOrders(oData);
      setUsers(uData);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load admin dashboard data:', err);
      setLoading(false);
    });
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const recentOrders = [...orders].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const stats = [{
    label: 'Total Products',
    value: products.length,
    icon: PackageIcon,
    color: '#EFB806',
    change: `${products.filter(p => p.inStock).length} in stock`
  }, {
    label: 'Total Orders',
    value: orders.length,
    icon: ShoppingCartIcon,
    color: '#3B653D',
    change: `${pendingOrders} pending`
  }, {
    label: 'Total Revenue',
    value: `Rs. ${totalRevenue.toFixed(2)}`,
    icon: DollarSignIcon,
    color: '#D37E05',
    change: `${deliveredOrders} delivered`
  }, {
    label: 'Total Users',
    value: users.length,
    icon: UsersIcon,
    color: '#E69D03',
    change: `${users.filter(u => u.role === 'admin').length} admins`
  }];
  if (loading) {
    return <div className="text-center py-20 text-[#AAAAAA]">Loading dashboard...</div>;
  }

  return <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => <motion.div key={stat.label} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: i * 0.08
      }} className="bg-[#222222] rounded-2xl p-5 border border-[#333333] hover:border-[#EFB806]/20 transition-colors group">
          
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{
            backgroundColor: `${stat.color}20`
          }}>
              
                <stat.icon size={20} style={{
              color: stat.color
            }} />
              
              </div>
              <div className="flex items-center gap-1 text-[#3B653D]">
                <TrendingUpIcon size={12} />
                <span className="text-xs font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-[#F5F5F5] mb-0.5" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
              {stat.value}
            </div>
            <div className="text-[#AAAAAA] text-xs">{stat.label}</div>
          </motion.div>)}
      </div>

      {/* Recent Orders + Quick Stats */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.35
      }} className="xl:col-span-2 bg-[#222222] rounded-2xl border border-[#333333] overflow-hidden">
          
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#333333]">
            <h3 className="text-base font-bold text-[#F5F5F5]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Recent Orders
            </h3>
            <Link to="/admin/orders" className="flex items-center gap-1 text-[#EFB806] text-xs font-medium hover:underline">
              
              View All <ArrowUpRightIcon size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#333333]">
                  {['Order ID', 'Customer', 'Date', 'Total', 'Status'].map(h => <th key={h} className="text-left text-[#AAAAAA] text-xs font-medium px-5 py-3 whitespace-nowrap">
                      
                        {h}
                      </th>)}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => {
                const sc = statusColors[order.status] || statusColors.pending;
                return <tr key={order.id} className="border-b border-[#333333]/50 hover:bg-[#2A2A2A] transition-colors">
                      
                      <td className="px-5 py-3 text-[#EFB806] text-sm font-mono font-medium">
                        {order.id}
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-[#F5F5F5] text-sm">
                          {order.customerName}
                        </div>
                        <div className="text-[#555555] text-xs">
                          {order.customerEmail}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[#AAAAAA] text-sm whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="px-5 py-3 text-[#F5F5F5] text-sm font-semibold">
                        Rs. {(order.total || 0).toFixed(2)}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${sc.bg} ${sc.text}`}>
                          
                          {order.status}
                        </span>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Stats Sidebar */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.45
      }} className="space-y-4">
          
          {/* Top Products */}
          <div className="bg-[#222222] rounded-2xl border border-[#333333] p-5">
            <h3 className="text-base font-bold text-[#F5F5F5] mb-4" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Top Products
            </h3>
            <div className="space-y-3">
              {[...products].sort((a, b) => b.sales - a.sales).slice(0, 5).map((p, i) => <div key={p.id} className="flex items-center gap-3">
                    <span className="text-[#555555] text-xs font-mono w-4">
                      {i + 1}
                    </span>
                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F5] text-sm truncate">
                        {p.name}
                      </p>
                      <p className="text-[#555555] text-xs">{p.sales} sales</p>
                    </div>
                    <span className="text-[#EFB806] text-sm font-semibold">
                      Rs. {p.price}
                    </span>
                  </div>)}
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="bg-[#222222] rounded-2xl border border-[#333333] p-5">
            <h3 className="text-base font-bold text-[#F5F5F5] mb-4" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Order Status
            </h3>
            <div className="space-y-2">
              {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => {
              const count = orders.filter(o => o.status === status).length;
              const pct = orders.length > 0 ? (count / orders.length * 100) : 0;
              const sc = statusColors[status];
              return <div key={status} className="flex items-center gap-3">
                    <span className={`text-xs capitalize font-medium w-20 ${sc.text}`}>
                      
                      {status}
                    </span>
                    <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <motion.div initial={{
                    width: 0
                  }} animate={{
                    width: `${pct}%`
                  }} transition={{
                    delay: 0.5,
                    duration: 0.6
                  }} className={`h-full rounded-full`} style={{
                    backgroundColor: sc.text.includes('EFB806') ? '#EFB806' : sc.text.includes('blue') ? '#3b82f6' : sc.text.includes('purple') ? '#a855f7' : sc.text.includes('3B653D') ? '#3B653D' : '#ef4444'
                  }} />
                      
                    </div>
                    <span className="text-[#AAAAAA] text-xs w-6 text-right">
                      {count}
                    </span>
                  </div>;
            })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
}