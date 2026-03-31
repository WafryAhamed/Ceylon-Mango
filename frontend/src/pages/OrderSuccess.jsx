import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, PackageIcon, ShoppingBagIcon } from 'lucide-react';
function Confetti() {
  const pieces = Array.from({
    length: 30
  }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#EFB806', '#E69D03', '#D37E05', '#3B653D', '#F5F5F5'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map(p => <motion.div key={p.id} className="absolute rounded-sm" style={{
      left: `${p.x}%`,
      top: '-20px',
      width: p.size,
      height: p.size,
      backgroundColor: p.color
    }} animate={{
      y: ['0vh', '110vh'],
      rotate: [0, 360 * 3],
      opacity: [1, 0.8, 0]
    }} transition={{
      duration: p.duration,
      delay: p.delay,
      ease: 'easeIn'
    }} />)}
    </div>;
}
export function OrderSuccess() {
  const [orderId] = useState(`ORD-${Math.floor(Math.random() * 90000) + 10000}`);
  return <div className="min-h-screen w-full bg-[#1A1A1A] flex items-center justify-center px-4 relative overflow-hidden">
      <Confetti />

      <motion.div initial={{
      opacity: 0,
      scale: 0.8,
      y: 40
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} transition={{
      duration: 0.7,
      ease: 'easeOut'
    }} className="relative z-10 bg-[#222222] rounded-3xl p-8 md:p-12 border border-[#EFB806]/20 max-w-lg w-full text-center">
        
        {/* Animated checkmark */}
        <motion.div initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 0.3,
        type: 'spring',
        stiffness: 200
      }} className="w-24 h-24 bg-[#3B653D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.5,
          type: 'spring',
          stiffness: 300
        }}>
            
            <CheckCircleIcon size={52} className="text-[#3B653D]" />
          </motion.div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }}>
          
          <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Order Confirmed! 🥭
          </h1>
          <p className="text-[#AAAAAA] text-lg mb-6">
            Thank you for your order. Your fresh mangoes are on their way!
          </p>

          <div className="bg-[#1A1A1A] rounded-2xl p-5 mb-6 border border-[#333333]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#AAAAAA] text-sm">Order ID</span>
              <span className="text-[#EFB806] font-bold font-mono">
                {orderId}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#AAAAAA] text-sm">Estimated Delivery</span>
              <span className="text-[#F5F5F5] font-medium">
                2–4 Business Days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#AAAAAA] text-sm">Status</span>
              <span className="bg-[#EFB806]/20 text-[#EFB806] text-xs font-semibold px-3 py-1 rounded-full">
                Processing
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8 px-2">
            {[{
            label: 'Confirmed',
            active: true
          }, {
            label: 'Processing',
            active: true
          }, {
            label: 'Shipped',
            active: false
          }, {
            label: 'Delivered',
            active: false
          }].map((step, i, arr) => <Fragment key={step.label}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.active ? 'bg-[#EFB806] text-[#1A1A1A]' : 'bg-[#333333] text-[#AAAAAA]'}`}>
                  
                    {step.active ? <CheckCircleIcon size={16} /> : i + 1}
                  </div>
                  <span className={`text-xs ${step.active ? 'text-[#EFB806]' : 'text-[#555555]'}`}>
                  
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${step.active && arr[i + 1].active ? 'bg-[#EFB806]' : 'bg-[#333333]'}`} />}
              </Fragment>)}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/orders" className="flex-1">
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="w-full flex items-center justify-center gap-2 py-3 border border-[#EFB806]/50 text-[#EFB806] font-semibold rounded-xl hover:bg-[#EFB806]/10 transition-all duration-200">
                
                <PackageIcon size={16} />
                View Orders
              </motion.button>
            </Link>
            <Link to="/shop" className="flex-1">
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="w-full flex items-center justify-center gap-2 py-3 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-all duration-200">
                
                <ShoppingBagIcon size={16} />
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>;
}