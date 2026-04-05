import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CategoryCard } from '../components/CategoryCard';
import { Footer } from '../components/Footer';
import api from '../api/axios';

const defaultCategories = [
  {
    id: 'fresh',
    name: 'Fresh Ceylon Mangoes',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
    count: 0,
  },
  {
    id: 'juice',
    name: 'Fresh Mango Juices',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop',
    count: 0,
  },
  {
    id: 'dried',
    name: 'Dried & Snacks',
    image: 'https://images.unsplash.com/photo-1598790740801-88e1e1e9c0b0?w=400&h=300&fit=crop',
    count: 0,
  },
  {
    id: 'preserves',
    name: 'Traditional Preserves',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    count: 0,
  },
];

export function Home() {
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const products = res.data;
        setCategories(defaultCategories.map(cat => ({
          ...cat,
          count: products.filter(p => p.category === cat.id).length,
        })));
      })
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />

      {/* Categories Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        }} className="text-center mb-12">
            
            <p className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-2">
              — Browse By Type
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F5]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Shop by <span className="text-gradient-mango">Category</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => <motion.div key={cat.id} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: i * 0.1
          }}>
              
                <CategoryCard category={cat} />
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-20 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,184,6,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="bg-[#222222] rounded-3xl p-10 md:p-16 border border-[#EFB806]/20">
            
            <span className="text-5xl mb-4 block">🥭</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F5] mb-4" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Fresh Mangoes,{' '}
              <span className="text-gradient-mango">Delivered Daily</span>
            </h2>
            <p className="text-[#AAAAAA] text-lg mb-8 max-w-xl mx-auto">
              Join thousands of happy customers who enjoy premium Ceylon mangoes
              every week.
            </p>
            <motion.a href="/shop" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.97
          }} className="inline-block px-10 py-4 bg-[#EFB806] text-[#1A1A1A] font-bold text-lg rounded-full shadow-lg shadow-[#EFB806]/30 hover:bg-[#E69D03] transition-all duration-300">
              
              Start Shopping
            </motion.a>
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </div>;
}