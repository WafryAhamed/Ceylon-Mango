import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBagIcon, ArrowLeftIcon, TagIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartItemRow } from '../components/CartItemRow';
import { useCart } from '../context/CartContext';
export function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const shipping = totalPrice > 30 ? 0 : 4.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
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
            
            Your <span className="text-gradient-mango">Cart</span>
          </h1>
          <p className="text-[#AAAAAA] mt-2">
            {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        {items.length === 0 ? <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="text-center py-24">
          
            <motion.div animate={{
          y: [0, -10, 0]
        }} transition={{
          duration: 3,
          repeat: Infinity
        }} className="text-7xl mb-6">
            
              🛒
            </motion.div>
            <h2 className="text-3xl font-bold text-[#F5F5F5] mb-3" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
              Your cart is empty
            </h2>
            <p className="text-[#AAAAAA] mb-8">
              Looks like you haven't added any mangoes yet!
            </p>
            <Link to="/shop">
              <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.97
          }} className="px-8 py-4 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-full shadow-lg shadow-[#EFB806]/20">
              
                Start Shopping
              </motion.button>
            </Link>
          </motion.div> : <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Link to="/shop" className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#EFB806] transition-colors text-sm">
                
                  <ArrowLeftIcon size={16} />
                  Continue Shopping
                </Link>
                <button onClick={clearCart} className="text-red-400/70 hover:text-red-400 text-sm transition-colors">
                
                  Clear Cart
                </button>
              </div>

              <AnimatePresence>
                {items.map(item => <CartItemRow key={item.product.id} item={item} />)}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.2
        }} className="lg:col-span-1">
            
              <div className="bg-[#222222] rounded-2xl p-6 border border-[#333333] sticky top-24">
                <h2 className="text-xl font-bold text-[#F5F5F5] mb-6" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAAAAA]">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="text-[#F5F5F5]">
                      ₨{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAAAAA]">Shipping</span>
                    <span className={shipping === 0 ? 'text-[#3B653D] font-medium' : 'text-[#F5F5F5]'}>
                    
                      {shipping === 0 ? 'FREE' : `₨${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAAAAA]">Tax (8%)</span>
                    <span className="text-[#F5F5F5]">₨{tax.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && <div className="bg-[#EFB806]/10 border border-[#EFB806]/20 rounded-xl p-3 text-xs text-[#EFB806]">
                      <TagIcon size={12} className="inline mr-1" />
                      Add ₨{(30 - totalPrice).toFixed(2)} more for free
                      shipping!
                    </div>}
                </div>

                <div className="border-t border-[#333333] pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#F5F5F5] font-bold text-lg">
                      Total
                    </span>
                    <span className="text-[#EFB806] font-bold text-xl">
                      ₨{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button onClick={() => navigate('/checkout')} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="w-full py-4 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-all duration-200 shadow-lg shadow-[#EFB806]/20 flex items-center justify-center gap-2">
                
                  <ShoppingBagIcon size={18} />
                  Proceed to Checkout
                </motion.button>

                <div className="mt-4 flex items-center justify-center gap-4 text-[#555555] text-xs">
                  <span>🔒 Secure Checkout</span>
                  <span>•</span>
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </motion.div>
          </div>}
      </div>

      <Footer />
    </div>;
}