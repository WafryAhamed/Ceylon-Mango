import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, StarIcon, HeartIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { wishlistApi } from '../api/wishlistApi';
import { useAuth } from '../context/AuthContext';
export function ProductCard({
  product
}) {
  const {
    addToCart
  } = useCart();
  const handleAddToCart = e => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`🥭 ${product.name} added to cart!`, {
      duration: 2500
    });
  };

  const { isAuthenticated } = useAuth();
  const handleAddToWishlist = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    try {
      await wishlistApi.addToWishlist(product.id);
      toast.success('Added to wishlist 💕');
    } catch {
      toast.error('Failed to add to wishlist');
    }
  };
  return <motion.div whileHover={{
    y: -6
  }} transition={{
    duration: 0.3,
    ease: 'easeOut'
  }} className="group relative">
      
      <Link to={`/product/${product.id}`}>
        <div className="bg-[#222222] rounded-2xl overflow-hidden border border-[#333333] transition-all duration-300 group-hover:border-[#EFB806]/40 group-hover:shadow-xl group-hover:shadow-[#EFB806]/10">
          {/* Image */}
          <div className="relative overflow-hidden h-52 bg-[#2A2A2A]">
            <motion.img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.originalPrice && <span className="bg-[#EFB806] text-[#1A1A1A] text-xs font-bold px-2 py-1 rounded-full">
                  SALE
                </span>}
              {!product.inStock && <span className="bg-[#333333] text-[#AAAAAA] text-xs font-medium px-2 py-1 rounded-full">
                  Out of Stock
                </span>}
            </div>

            {/* Wishlist Quick Add */}
            <motion.button onClick={handleAddToWishlist} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              className="absolute top-3 right-3 p-2 bg-[#222222]/90 backdrop-blur-sm border border-[#333333] rounded-full text-[#AAAAAA] hover:text-[#EFB806] hover:border-[#EFB806]/40 transition-all duration-300 shadow-lg z-10 opacity-0 group-hover:opacity-100">
              <HeartIcon size={16} />
            </motion.button>

            {/* Quick add button */}
            <motion.button onClick={handleAddToCart} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} disabled={!product.inStock} className="absolute bottom-3 right-3 p-2.5 bg-[#EFB806] text-[#1A1A1A] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              
              <ShoppingCartIcon size={16} />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-[#F5F5F5] font-semibold text-base leading-tight group-hover:text-[#EFB806] transition-colors duration-200" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} size={12} className={i < Math.floor(product.rating) ? 'text-[#EFB806] fill-[#EFB806]' : 'text-[#444444]'} />)}
              </div>
              <span className="text-[#AAAAAA] text-xs">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#EFB806] font-bold text-lg">
                  Rs. {product.price.toFixed(2)}
                </span>
                {product.originalPrice && <span className="text-[#AAAAAA] text-sm line-through">
                    Rs. {product.originalPrice.toFixed(2)}
                  </span>}
              </div>
              <span className="text-[#AAAAAA] text-xs">{product.weight}</span>
            </div>

            {/* Add to cart button */}
            <motion.button onClick={handleAddToCart} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} disabled={!product.inStock} className="mt-3 w-full py-2.5 bg-[#EFB806]/10 border border-[#EFB806]/30 text-[#EFB806] text-sm font-semibold rounded-xl hover:bg-[#EFB806] hover:text-[#1A1A1A] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
              
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>;
}