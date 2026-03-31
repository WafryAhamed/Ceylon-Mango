import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon, ShoppingCartIcon } from 'lucide-react';
import { toast } from 'sonner';
import { mockAdminOrders } from '../data/adminData';
const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
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
function OrderRow({
  order,
  onStatusChange
}) {
  const [expanded, setExpanded] = useState(false);
  const sc = statusColors[order.status];
  return <>
      <motion.tr layout className="border-b border-[#333333]/50 hover:bg-[#2A2A2A] transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
        
        <td className="px-5 py-3 text-[#EFB806] text-sm font-mono font-medium">
          {order.id}
        </td>
        <td className="px-5 py-3">
          <div className="text-[#F5F5F5] text-sm">{order.customerName}</div>
          <div className="text-[#555555] text-xs">{order.customerEmail}</div>
        </td>
        <td className="px-5 py-3 text-[#AAAAAA] text-sm whitespace-nowrap">
          {order.date}
        </td>
        <td className="px-5 py-3 text-[#AAAAAA] text-sm">
          {order.items.length} item{order.items.length > 1 ? 's' : ''}
        </td>
        <td className="px-5 py-3 text-[#F5F5F5] text-sm font-semibold">
          ${order.total.toFixed(2)}
        </td>
        <td className="px-5 py-3" onClick={e => e.stopPropagation()}>
          <select value={order.status} onChange={e => onStatusChange(order.id, e.target.value)} className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold capitalize border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#EFB806]/50 ${sc.bg} ${sc.text}`} style={{
          backgroundColor: 'transparent'
        }}>
            
            {statusOptions.map(s => <option key={s} value={s} className="bg-[#222222] text-[#F5F5F5]">
                {s}
              </option>)}
          </select>
        </td>
        <td className="px-5 py-3 text-[#AAAAAA] text-sm whitespace-nowrap">
          {order.paymentMethod}
        </td>
        <td className="px-5 py-3">
          {expanded ? <ChevronUpIcon size={16} className="text-[#AAAAAA]" /> : <ChevronDownIcon size={16} className="text-[#AAAAAA]" />}
        </td>
      </motion.tr>
      <AnimatePresence>
        {expanded && <motion.tr initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
          
            <td colSpan={8} className="px-5 py-4 bg-[#1A1A1A]/50">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[#AAAAAA] text-xs mb-2 font-medium">
                    Order Items
                  </p>
                  <div className="space-y-1.5">
                    {order.items.map((item, i) => <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#F5F5F5]">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-[#EFB806]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>)}
                  </div>
                </div>
                <div>
                  <p className="text-[#AAAAAA] text-xs mb-2 font-medium">
                    Shipping Address
                  </p>
                  <p className="text-[#F5F5F5] text-sm">
                    {order.shippingAddress}
                  </p>
                </div>
              </div>
            </td>
          </motion.tr>}
      </AnimatePresence>
    </>;
}
export function AdminOrders() {
  const [orders, setOrders] = useState(mockAdminOrders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const filtered = useMemo(() => {
    let result = orders;
    if (filterStatus !== 'all') result = result.filter(o => o.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(o => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q));
    }
    return result;
  }, [orders, search, filterStatus]);
  const handleStatusChange = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? {
      ...o,
      status
    } : o));
    toast.success(`📦 Order ${id} updated to "${status}"`);
  };
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        
        <h1 className="text-2xl font-bold text-[#F5F5F5]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          
          Orders
        </h1>
        <p className="text-[#AAAAAA] text-sm">{orders.length} orders total</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="flex flex-col sm:flex-row gap-3">
        
        <div className="relative flex-1">
          <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
          
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or customer..." className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
          
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...statusOptions].map(s => {
          const sc = s !== 'all' ? statusColors[s] : null;
          return <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${filterStatus === s ? 'bg-[#EFB806] text-[#1A1A1A]' : 'bg-[#222222] text-[#AAAAAA] border border-[#333333] hover:border-[#EFB806]/40'}`}>
                
                {s}
              </button>;
        })}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="bg-[#222222] rounded-2xl border border-[#333333] overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333333]">
                {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Payment', ''].map(h => <th key={h} className="text-left text-[#AAAAAA] text-xs font-medium px-5 py-3 whitespace-nowrap">
                  
                    {h}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />)}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && <div className="text-center py-16">
            <ShoppingCartIcon size={40} className="text-[#333333] mx-auto mb-3" />
          
            <p className="text-[#AAAAAA] text-sm">No orders found</p>
          </div>}
      </motion.div>
    </div>;
}