import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCardIcon, TruckIcon, CheckIcon, LockIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { orderApi } from '../api/orderApi';
export function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    totalPrice,
    clearCart
  } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Sri Lanka',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });
  const shipping = totalPrice > 30 ? 0 : 4.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;
  const update = field => e => setForm(prev => ({
    ...prev,
    [field]: e.target.value
  }));
  const handlePlaceOrder = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const fullAddress = `${form.firstName} ${form.lastName}, ${form.address}, ${form.city}, ${form.zip}, ${form.country}`;
      await orderApi.createOrder({
        shippingAddress: fullAddress,
        paymentMethod: paymentMethod === 'card' ? 'CREDIT_CARD' : 'CASH_ON_DELIVERY'
      });
      clearCart();
      navigate('/order-success');
    } catch {
      toast.error('Failed to place order. Please try again.');
      setLoading(false);
    }
  };
  const inputClass = 'w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm';
  const labelClass = 'block text-[#AAAAAA] text-sm mb-1.5';
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
            
            <span className="text-gradient-mango">Checkout</span>
          </h1>
          <p className="text-[#AAAAAA] mt-2">Complete your order securely</p>
        </motion.div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Shipping + Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="bg-[#222222] rounded-2xl p-6 border border-[#333333]">
                
                <h2 className="text-lg font-bold text-[#F5F5F5] mb-5 flex items-center gap-2" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                  <TruckIcon size={20} className="text-[#EFB806]" />
                  Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input type="text" value={form.firstName} onChange={update('firstName')} required placeholder="John" className={inputClass} />
                    
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" value={form.lastName} onChange={update('lastName')} required placeholder="Doe" className={inputClass} />
                    
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" value={form.email} onChange={update('email')} required placeholder="john@example.com" className={inputClass} />
                    
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input type="tel" value={form.phone} onChange={update('phone')} required placeholder="+94 77 123 4567" className={inputClass} />
                    
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address</label>
                    <input type="text" value={form.address} onChange={update('address')} required placeholder="42 Mango Lane" className={inputClass} />
                    
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" value={form.city} onChange={update('city')} required placeholder="Colombo" className={inputClass} />
                    
                  </div>
                  <div>
                    <label className={labelClass}>Postal Code</label>
                    <input type="text" value={form.zip} onChange={update('zip')} required placeholder="00700" className={inputClass} />
                    
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Country</label>
                    <select value={form.country} onChange={update('country')} className={inputClass}>
                      
                      <option>Sri Lanka</option>
                      <option>India</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-[#222222] rounded-2xl p-6 border border-[#333333]">
                
                <h2 className="text-lg font-bold text-[#F5F5F5] mb-5 flex items-center gap-2" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                  <CreditCardIcon size={20} className="text-[#EFB806]" />
                  Payment Method
                </h2>

                <div className="flex gap-4 mb-6">
                  {[{
                  id: 'card',
                  label: 'Credit / Debit Card',
                  icon: CreditCardIcon
                }, {
                  id: 'cod',
                  label: 'Cash on Delivery',
                  icon: TruckIcon
                }].map(method => <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id)} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === method.id ? 'border-[#EFB806] bg-[#EFB806]/10' : 'border-[#333333] hover:border-[#EFB806]/40'}`}>
                    
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#EFB806] bg-[#EFB806]' : 'border-[#555555]'}`}>
                      
                        {paymentMethod === method.id && <CheckIcon size={12} className="text-[#1A1A1A]" />}
                      </div>
                      <method.icon size={16} className={paymentMethod === method.id ? 'text-[#EFB806]' : 'text-[#AAAAAA]'} />
                    
                      <span className={`text-sm font-medium ${paymentMethod === method.id ? 'text-[#EFB806]' : 'text-[#AAAAAA]'}`}>
                      
                        {method.label}
                      </span>
                    </button>)}
                </div>

                {paymentMethod === 'card' && <motion.div initial={{
                opacity: 0,
                height: 0
              }} animate={{
                opacity: 1,
                height: 'auto'
              }} className="space-y-4">
                  
                    <div>
                      <label className={labelClass}>Card Number</label>
                      <input type="text" value={form.cardNumber} onChange={update('cardNumber')} placeholder="1234 5678 9012 3456" maxLength={19} className={inputClass} />
                    
                    </div>
                    <div>
                      <label className={labelClass}>Cardholder Name</label>
                      <input type="text" value={form.cardName} onChange={update('cardName')} placeholder="John Doe" className={inputClass} />
                    
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Expiry Date</label>
                        <input type="text" value={form.cardExpiry} onChange={update('cardExpiry')} placeholder="MM/YY" maxLength={5} className={inputClass} />
                      
                      </div>
                      <div>
                        <label className={labelClass}>CVV</label>
                        <input type="text" value={form.cardCvv} onChange={update('cardCvv')} placeholder="123" maxLength={3} className={inputClass} />
                      
                      </div>
                    </div>
                  </motion.div>}

                {paymentMethod === 'cod' && <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} className="bg-[#EFB806]/10 border border-[#EFB806]/20 rounded-xl p-4 text-sm text-[#EFB806]">
                  
                    💰 Pay with cash when your order is delivered. A small COD
                    fee of $1.50 may apply.
                  </motion.div>}
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.3
          }} className="lg:col-span-1">
              
              <div className="bg-[#222222] rounded-2xl p-6 border border-[#333333] sticky top-24">
                <h2 className="text-lg font-bold text-[#F5F5F5] mb-5" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5 max-h-48 overflow-y-auto">
                  {items.map(item => <div key={item.product.id} className="flex items-center gap-3">
                    
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                    
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F5F5F5] text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[#AAAAAA] text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-[#EFB806] text-sm font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>)}
                </div>

                <div className="border-t border-[#333333] pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAAAAA]">Subtotal</span>
                    <span className="text-[#F5F5F5]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAAAAA]">Shipping</span>
                    <span className={shipping === 0 ? 'text-[#3B653D]' : 'text-[#F5F5F5]'}>
                      
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAAAAA]">Tax</span>
                    <span className="text-[#F5F5F5]">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-[#333333] pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#F5F5F5] font-bold">Total</span>
                    <span className="text-[#EFB806] font-bold text-xl">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button type="submit" disabled={loading || items.length === 0} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="w-full py-4 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-all duration-200 shadow-lg shadow-[#EFB806]/20 disabled:opacity-50 flex items-center justify-center gap-2">
                  
                  {loading ? <motion.span animate={{
                  rotate: 360
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }} className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full" /> : <>
                      <LockIcon size={16} />
                      Place Order
                    </>}
                </motion.button>

                <p className="text-center text-[#555555] text-xs mt-3">
                  🔒 256-bit SSL Encrypted
                </p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>;
}