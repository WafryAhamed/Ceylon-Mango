import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { ProductCard } from './ProductCard';
import api from '../api/axios';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
export function FeaturedProducts() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get('/products/featured')
      .then(res => setFeatured(res.data))
      .catch(err => console.error('Failed to load featured products:', err));
  }, []);

  return <section className="py-20 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          
          <div>
            <p className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-2">
              — Handpicked For You
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F5]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Featured <span className="text-gradient-mango">Products</span>
            </h2>
            <div className="mt-3 w-16 h-1 bg-[#EFB806] rounded-full" />
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-[#EFB806] font-medium hover:gap-3 transition-all duration-200">
            
            View All Products
            <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
            
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: '-80px'
      }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {featured.map(product => <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}