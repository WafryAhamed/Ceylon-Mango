import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, ShoppingBagIcon, Trash2Icon, ShoppingCartIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { wishlistApi } from '../api/wishlistApi';
import { useAuth } from '../context/AuthContext';

export function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      wishlistApi.getWishlist()
        .then(res => {
          setItems(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load wishlist:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleRemove = async (productId) => {
    try {
      await wishlistApi.removeFromWishlist(productId);
      setItems(prev => prev.filter(item => String(item.product.id) !== String(productId)));
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Failed to remove from wishlist');
    }
  };

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
            
            My <span className="text-gradient-mango">Wishlist</span>
          </h1>
          <p className="text-[#AAAAAA] mt-2">
            {items.length} item{items.length !== 1 ? 's' : ''} saved for later
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-24">
            <span className="text-6xl mb-4 block">🥭</span>
            <p className="text-[#AAAAAA]">Loading wishlist...</p>
          </div>
        ) : !isAuthenticated ? (
          <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} className="flex flex-col items-center justify-center py-24 bg-[#222222] rounded-3xl border border-[#333333]">
            <div className="w-20 h-20 rounded-full bg-[#EFB806]/10 flex items-center justify-center mb-6">
              <HeartIcon size={36} className="text-[#EFB806]" />
            </div>
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
              Sign In to View Wishlist
            </h2>
            <p className="text-[#AAAAAA] text-center max-w-md mb-8 px-4">
              Please sign in to manage your wishlist and save your favorite mangoes.
            </p>
            <Link to="/login">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-full hover:bg-[#E69D03] transition-colors shadow-lg shadow-[#EFB806]/20">
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        ) : items.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative group">
                  <ProductCard product={item.product} />
                  {/* Remove from wishlist button */}
                  <motion.button
                    onClick={() => handleRemove(item.product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 z-10 p-2 bg-[#222222]/90 backdrop-blur-sm border border-[#333333] rounded-full text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 shadow-lg">
                    <Trash2Icon size={14} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Footer />
    </div>;
}