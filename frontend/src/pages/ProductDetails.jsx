import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, StarIcon, ChevronRightIcon, MinusIcon, PlusIcon, TruckIcon, ShieldCheckIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
export function ProductDetails() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    addToCart
  } = useCart();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  if (!product) {
    return <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🥭</span>
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Product not found
          </h2>
          <Link to="/shop" className="text-[#EFB806] hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>;
  }
  const images = product.images || [product.image];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`🥭 ${product.name} added to cart!`);
  };
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="flex items-center gap-2 text-sm text-[#AAAAAA] mb-8">
          
          <Link to="/" className="hover:text-[#EFB806] transition-colors">
            Home
          </Link>
          <ChevronRightIcon size={14} />
          <Link to="/shop" className="hover:text-[#EFB806] transition-colors">
            Shop
          </Link>
          <ChevronRightIcon size={14} />
          <span className="text-[#F5F5F5]">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div initial={{
          opacity: 0,
          x: -40
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }}>
            
            <div className="relative overflow-hidden rounded-3xl bg-[#222222] mb-4 aspect-square">
              <motion.img key={selectedImage} initial={{
              opacity: 0,
              scale: 1.05
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.4
            }} src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              
              {!product.inStock && <div className="absolute inset-0 bg-[#1A1A1A]/60 flex items-center justify-center">
                  <span className="bg-[#333333] text-[#AAAAAA] px-6 py-3 rounded-full font-semibold">
                    Out of Stock
                  </span>
                </div>}
            </div>
            {images.length > 1 && <div className="flex gap-3">
                {images.map((img, i) => <motion.button key={i} onClick={() => setSelectedImage(i)} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === i ? 'border-[#EFB806]' : 'border-[#333333]'}`}>
                
                    <img src={img} alt="" className="w-full h-full object-cover" />
                
                  </motion.button>)}
              </div>}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{
          opacity: 0,
          x: 40
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFB806]/10 border border-[#EFB806]/20 rounded-full mb-4">
              <span className="text-[#EFB806] text-xs font-semibold uppercase tracking-wide">
                {product.category === 'fresh' ? 'Fresh Mango' : product.category === 'juice' ? 'Mango Juice' : product.category === 'dried' ? 'Dried Mango' : 'Preserves'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} size={16} className={i < Math.floor(product.rating) ? 'text-[#EFB806] fill-[#EFB806]' : 'text-[#444444]'} />)}
              </div>
              <span className="text-[#EFB806] font-semibold">
                {product.rating}
              </span>
              <span className="text-[#AAAAAA] text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-[#EFB806]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && <span className="text-xl text-[#AAAAAA] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>}
              {product.originalPrice && <span className="bg-[#EFB806] text-[#1A1A1A] text-sm font-bold px-3 py-1 rounded-full">
                  {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}
                  % OFF
                </span>}
            </div>

            <p className="text-[#AAAAAA] leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mb-6 text-sm">
              <span className="text-[#AAAAAA]">Weight:</span>
              <span className="bg-[#222222] border border-[#333333] text-[#F5F5F5] px-3 py-1 rounded-full">
                {product.weight}
              </span>
              <span className={`px-3 py-1 rounded-full font-medium ${product.inStock ? 'bg-[#3B653D]/20 text-[#3B653D]' : 'bg-red-900/20 text-red-400'}`}>
                
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#AAAAAA] text-sm">Quantity:</span>
              <div className="flex items-center gap-3 bg-[#222222] border border-[#333333] rounded-xl px-3 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#AAAAAA] hover:text-[#EFB806] transition-colors">
                  
                  <MinusIcon size={16} />
                </button>
                <span className="text-[#F5F5F5] font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-[#AAAAAA] hover:text-[#EFB806] transition-colors">
                  
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button onClick={handleAddToCart} disabled={!product.inStock} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-all duration-200 shadow-lg shadow-[#EFB806]/20 disabled:opacity-40 disabled:cursor-not-allowed">
                
                <ShoppingCartIcon size={18} />
                Add to Cart
              </motion.button>
              <motion.button onClick={handleBuyNow} disabled={!product.inStock} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="flex-1 py-4 border border-[#EFB806]/50 text-[#EFB806] font-bold rounded-xl hover:bg-[#EFB806]/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                
                Buy Now
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[{
              icon: TruckIcon,
              label: 'Free Delivery',
              sub: 'Orders over $30'
            }, {
              icon: ShieldCheckIcon,
              label: 'Quality Assured',
              sub: '100% Organic'
            }, {
              icon: RefreshCwIcon,
              label: 'Easy Returns',
              sub: '7-day policy'
            }].map(badge => <div key={badge.label} className="bg-[#222222] rounded-xl p-3 text-center border border-[#333333]">
                
                  <badge.icon size={18} className="text-[#EFB806] mx-auto mb-1" />
                
                  <p className="text-[#F5F5F5] text-xs font-semibold">
                    {badge.label}
                  </p>
                  <p className="text-[#AAAAAA] text-xs">{badge.sub}</p>
                </div>)}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && <section>
            <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-3xl font-bold text-[#F5F5F5] mb-8" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
              You May Also <span className="text-gradient-mango">Like</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <motion.div key={p.id} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }}>
              
                  <ProductCard product={p} />
                </motion.div>)}
            </div>
          </section>}
      </div>

      <Footer />
    </div>;
}