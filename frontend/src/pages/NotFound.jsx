import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, ShoppingBagIcon } from 'lucide-react';
export function NotFound() {
  return <div className="min-h-screen w-full bg-[#1A1A1A] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Floating mango */}
        <motion.div animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }} className="text-8xl md:text-9xl mb-8 inline-block">
          
          🥭
        </motion.div>

        {/* 404 heading */}
        <motion.h1 initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-7xl md:text-9xl font-bold text-[#EFB806] mb-4" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          
          404
        </motion.h1>

        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-3" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          
          This Mango Got Lost!
        </motion.h2>

        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }} className="text-[#AAAAAA] text-lg mb-10 max-w-md mx-auto">
          
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to the good stuff.
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.6
      }} className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link to="/">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-full hover:bg-[#E69D03] transition-colors shadow-lg shadow-[#EFB806]/20">
              
              <HomeIcon size={18} />
              Go Home
            </motion.button>
          </Link>
          <Link to="/shop">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#EFB806]/40 text-[#EFB806] font-semibold rounded-full hover:bg-[#EFB806]/10 transition-colors">
              
              <ShoppingBagIcon size={18} />
              Browse Shop
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(239,184,6,0.06)_0%,_transparent_70%)]" />
        </div>
      </div>
    </div>;
}