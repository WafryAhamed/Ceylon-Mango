import React from 'react';
import { motion } from 'framer-motion';
import { Trash2Icon, PlusIcon, MinusIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
export function CartItemRow({
  item
}) {
  const {
    updateQuantity,
    removeFromCart
  } = useCart();
  return <motion.div layout initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: 20,
    height: 0
  }} transition={{
    duration: 0.3
  }} className="flex items-center gap-4 bg-[#222222] rounded-2xl p-4 border border-[#333333]">
      
      {/* Image */}
      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
      

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[#F5F5F5] font-semibold text-base truncate" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          
          {item.product.name}
        </h3>
        <p className="text-[#AAAAAA] text-sm mt-0.5">{item.product.weight}</p>
        <p className="text-[#EFB806] font-bold mt-1">
          ₨{item.product.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <motion.button whileTap={{
        scale: 0.9
      }} onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-[#444444] flex items-center justify-center text-[#F5F5F5] hover:border-[#EFB806]/50 hover:text-[#EFB806] transition-colors">
          
          <MinusIcon size={14} />
        </motion.button>
        <motion.span key={item.quantity} initial={{
        scale: 1.3
      }} animate={{
        scale: 1
      }} className="w-8 text-center text-[#F5F5F5] font-semibold text-sm">
          
          {item.quantity}
        </motion.span>
        <motion.button whileTap={{
        scale: 0.9
      }} onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-[#444444] flex items-center justify-center text-[#F5F5F5] hover:border-[#EFB806]/50 hover:text-[#EFB806] transition-colors">
          
          <PlusIcon size={14} />
        </motion.button>
      </div>

      {/* Line Total */}
      <div className="text-right min-w-[70px]">
        <p className="text-[#EFB806] font-bold text-base">
          ₨{(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <motion.button whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} onClick={() => removeFromCart(item.product.id)} className="p-2 text-[#AAAAAA] hover:text-red-400 transition-colors">
        
        <Trash2Icon size={16} />
      </motion.button>
    </motion.div>;
}