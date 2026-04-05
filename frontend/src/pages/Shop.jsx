import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import api from '../api/axios';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'fresh', name: 'Fresh Ceylon Mangoes' },
  { id: 'juice', name: 'Fresh Mango Juices' },
  { id: 'dried', name: 'Dried & Snacks' },
  { id: 'preserves', name: 'Traditional Preserves' },
];

export function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);

  const filtered = React.useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
    }
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, activeCategory, search, sortBy]);
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      {/* Page Header */}
      <section className="pt-28 pb-12 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,184,6,0.06)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-2">
            
            — Our Collection
          </motion.p>
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="text-4xl md:text-6xl font-bold text-[#F5F5F5]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Shop <span className="text-gradient-mango">Ceylon Mango</span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="mt-4 text-[#AAAAAA] text-lg">
            
            {products.length} premium products from Sri Lanka's finest orchards
          </motion.p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Sort */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="flex flex-col sm:flex-row gap-4 mb-8">
            
            <div className="relative flex-1">
              <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
              
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mangoes, juices, jams..." className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
              
            </div>
            <div className="relative">
              <SlidersHorizontalIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
              
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl pl-9 pr-8 py-3 focus:outline-none focus:border-[#EFB806]/50 text-sm appearance-none cursor-pointer">
                
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="flex gap-2 flex-wrap mb-10">
            
            {categories.map(cat => <motion.button key={cat.id} onClick={() => setActiveCategory(cat.id)} whileHover={{
            scale: 1.03
          }} whileTap={{
            scale: 0.97
          }} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id ? 'bg-[#EFB806] text-[#1A1A1A] shadow-lg shadow-[#EFB806]/20' : 'bg-[#222222] text-[#AAAAAA] border border-[#333333] hover:border-[#EFB806]/40 hover:text-[#EFB806]'}`}>
              
                {cat.name}
              </motion.button>)}
          </motion.div>

          {/* Results count */}
          <p className="text-[#AAAAAA] text-sm mb-6">
            Showing{' '}
            <span className="text-[#EFB806] font-medium">
              {filtered.length}
            </span>{' '}
            products
          </p>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            {loading ? <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24">
                <span className="text-6xl mb-4 block">🥭</span>
                <p className="text-[#AAAAAA]">Loading products...</p>
              </motion.div> : filtered.length === 0 ? <motion.div key="empty" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} className="text-center py-24">
              
                <span className="text-6xl mb-4 block">🥭</span>
                <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                  No products found
                </h3>
                <p className="text-[#AAAAAA]">
                  Try adjusting your search or filter.
                </p>
              </motion.div> : <motion.div key="grid" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
                {filtered.map((product, i) => <motion.div key={product.id} initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4,
              delay: i * 0.06
            }}>
                
                    <ProductCard product={product} />
                  </motion.div>)}
              </motion.div>}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>;
}