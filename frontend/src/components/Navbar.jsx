import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
const navLinks = [{
  label: 'Home',
  href: '/'
}, {
  label: 'Shop',
  href: '/shop'
}, {
  label: 'About',
  href: '/about'
}, {
  label: 'Contact',
  href: '/contact'
}];
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    totalItems
  } = useCart();
  const {
    isAuthenticated
  } = useAuth();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  return <motion.nav initial={{
    y: -80,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.6,
    ease: 'easeOut'
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-[#EFB806]/10 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🥭</span>
            <span className="text-xl md:text-2xl font-bold text-[#EFB806]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Ceylon Mango
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <Link key={link.href} to={link.href} className={`relative text-sm font-medium transition-colors duration-200 group ${location.pathname === link.href ? 'text-[#EFB806]' : 'text-[#F5F5F5]/80 hover:text-[#EFB806]'}`}>
              
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#EFB806] transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              
              </Link>)}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to={isAuthenticated ? '/dashboard' : '/login'} className="p-2 text-[#F5F5F5]/80 hover:text-[#EFB806] transition-colors duration-200">
              
              <UserIcon size={20} />
            </Link>
            <Link to="/cart" className="relative p-2 text-[#F5F5F5]/80 hover:text-[#EFB806] transition-colors duration-200">
              
              <ShoppingCartIcon size={20} />
              {totalItems > 0 && <motion.span initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} className="absolute -top-1 -right-1 bg-[#EFB806] text-[#1A1A1A] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>}
            </Link>
            <Link to="/shop" className="px-5 py-2 bg-[#EFB806] text-[#1A1A1A] font-semibold text-sm rounded-full hover:bg-[#E69D03] transition-all duration-200 hover:shadow-lg hover:shadow-[#EFB806]/30">
              
              Order Now
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative p-2 text-[#F5F5F5]/80">
              <ShoppingCartIcon size={20} />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-[#EFB806] text-[#1A1A1A] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-[#F5F5F5]/80 hover:text-[#EFB806] transition-colors">
              
              {mobileOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="md:hidden glass border-t border-[#EFB806]/10 overflow-hidden">
          
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link, i) => <motion.div key={link.href} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: i * 0.08
          }}>
              
                  <Link to={link.href} className={`block text-base font-medium py-2 border-b border-[#333333] ${location.pathname === link.href ? 'text-[#EFB806]' : 'text-[#F5F5F5]/80'}`}>
                
                    {link.label}
                  </Link>
                </motion.div>)}
              <div className="flex gap-3 pt-2">
                <Link to={isAuthenticated ? '/dashboard' : '/login'} className="flex-1 py-2 text-center border border-[#EFB806]/40 text-[#EFB806] rounded-full text-sm font-medium">
                
                  {isAuthenticated ? 'Dashboard' : 'Login'}
                </Link>
                <Link to="/shop" className="flex-1 py-2 text-center bg-[#EFB806] text-[#1A1A1A] rounded-full text-sm font-semibold">
                
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
}