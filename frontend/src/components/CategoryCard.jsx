import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
export function CategoryCard({
  category
}) {
  return <motion.div whileHover={{
    y: -4
  }} transition={{
    duration: 0.3
  }} className="group">
      
      <Link to={`/shop?category=${category.id}`}>
        <div className="relative overflow-hidden rounded-2xl h-52 cursor-pointer">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#EFB806]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-[#F5F5F5] font-bold text-xl mb-1" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              {category.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-[#EFB806] text-sm">
                {category.count} products
              </span>
              <motion.div className="w-8 h-8 bg-[#EFB806] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" whileHover={{
              scale: 1.1
            }}>
                
                <ArrowRightIcon size={14} className="text-[#1A1A1A]" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>;
}