import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageIcon, ChevronDownIcon, ChevronUpIcon, ShoppingBagIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { mockOrders } from '../data/orders';
const statusConfig = {
  processing: {
    label: 'Processing',
    color: 'text-[#EFB806]',
    bg: 'bg-[#EFB806]/20'
  },
  shipped: {
    label: 'Shipped',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  },
  delivered: {
    label: 'Delivered',
    color: 'text-[#3B653D]',
    bg: 'bg-[#3B653D]/20'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-400',
    bg: 'bg-red-500/20'
  }
};
function OrderCard({
  order
}) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[order.status];
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} className="bg-[#222222] rounded-2xl border border-[#333333] overflow-hidden">
      
      {/* Header */}
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-5 hover:bg-[#2A2A2A] transition-colors">
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#EFB806]/10 rounded-xl flex items-center justify-center">
            <PackageIcon size={18} className="text-[#EFB806]" />
          </div>
          <div className="text-left">
            <p className="text-[#F5F5F5] font-bold">{order.id}</p>
            <p className="text-[#AAAAAA] text-sm">
              {order.date} · {order.items.length} item
              {order.items.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[#EFB806] font-bold">
              ${order.total.toFixed(2)}
            </p>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${status.bg} ${status.color}`}>
              
              {status.label}
            </span>
          </div>
          {expanded ? <ChevronUpIcon size={18} className="text-[#AAAAAA]" /> : <ChevronDownIcon size={18} className="text-[#AAAAAA]" />}
        </div>
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="overflow-hidden">
          
            <div className="px-5 pb-5 border-t border-[#333333] pt-4">
              <div className="space-y-3 mb-4">
                {order.items.map(item => <div key={item.productId} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                
                    <div className="flex-1">
                      <p className="text-[#F5F5F5] text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-[#AAAAAA] text-xs">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-[#EFB806] font-semibold text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>)}
              </div>
              <div className="border-t border-[#333333] pt-3 grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[#AAAAAA] text-xs mb-1">
                    Shipping Address
                  </p>
                  <p className="text-[#F5F5F5]">{order.shippingAddress}</p>
                </div>
                <div>
                  <p className="text-[#AAAAAA] text-xs mb-1">Payment Method</p>
                  <p className="text-[#F5F5F5]">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
}
export function OrderHistory() {
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-8">
          
          <h1 className="text-4xl font-bold text-[#F5F5F5]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Order <span className="text-gradient-mango">History</span>
          </h1>
          <p className="text-[#AAAAAA] mt-2">
            {mockOrders.length} orders found
          </p>
        </motion.div>

        {mockOrders.length === 0 ? <div className="text-center py-24">
            <ShoppingBagIcon size={56} className="text-[#333333] mx-auto mb-4" />
          
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-3" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
              No orders yet
            </h2>
            <p className="text-[#AAAAAA] mb-6">
              Start shopping to see your orders here.
            </p>
            <Link to="/shop">
              <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.97
          }} className="px-8 py-3 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-full">
              
                Shop Now
              </motion.button>
            </Link>
          </div> : <div className="space-y-4">
            {mockOrders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>}
      </div>

      <Footer />
    </div>;
}