import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingBagIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
export function Wishlist() {
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="mb-8">
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            My Wishlist
          </h1>
          <p className="text-[#AAAAAA] mt-2">Items you've saved for later</p>
        </motion.div>

        {/* Empty state */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="flex flex-col items-center justify-center py-24 bg-[#222222] rounded-3xl border border-[#333333]">
          
          <motion.div animate={{
          scale: [1, 1.1, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} className="w-20 h-20 rounded-full bg-[#EFB806]/10 flex items-center justify-center mb-6">
            
            <HeartIcon size={36} className="text-[#EFB806]" />
          </motion.div>

          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Your Wishlist is Empty
          </h2>
          <p className="text-[#AAAAAA] text-center max-w-md mb-8 px-4">
            You haven't saved any items yet. Browse our collection and tap the
            heart icon to add your favorite mangoes here.
          </p>

          <Link to="/shop">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-full hover:bg-[#E69D03] transition-colors shadow-lg shadow-[#EFB806]/20">
              
              <ShoppingBagIcon size={18} />
              Browse Shop
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>;
}