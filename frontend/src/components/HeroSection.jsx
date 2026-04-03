import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, StarIcon } from 'lucide-react';
export function HeroSection() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const mangoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1A1A]">
      
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,101,61,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(211,126,5,0.08)_0%,_transparent_60%)]" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => <motion.div key={i} className="absolute rounded-full bg-[#EFB806]/10" style={{
      width: Math.random() * 60 + 20,
      height: Math.random() * 60 + 20,
      left: `${10 + i * 15}%`,
      top: `${20 + i % 3 * 25}%`
    }} animate={{
      y: [0, -30, 0],
      opacity: [0.3, 0.7, 0.3]
    }} transition={{
      duration: 4 + i * 0.8,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.5
    }} />)}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Text Content */}
          <motion.div style={{
          y: textY,
          opacity
        }} className="order-2 lg:order-1">
            
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFB806]/10 border border-[#EFB806]/20 mb-6">
              
              <StarIcon size={14} className="text-[#EFB806] fill-[#EFB806]" />
              <span className="text-[#EFB806] text-sm font-medium">
                Premium Sri Lankan Mangoes
              </span>
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 40
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.35
          }} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Taste the <span className="text-gradient-mango">Luxury</span>
              <br />
              of Ceylon <span className="text-[#EFB806]">Mangoes</span>
            </motion.h1>

            <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }} className="text-[#F5F5F5]/70 text-lg md:text-xl mb-8 max-w-md leading-relaxed">
              
              Fresh. Organic. Delivered to your doorstep.
              <br />
              <span className="text-[#F5F5F5]/50 text-base">
                Hand-picked from the finest orchards of Sri Lanka.
              </span>
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.65
          }} className="flex flex-col sm:flex-row gap-4">
              
              <Link to="/shop">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.97
              }} className="group flex items-center gap-3 px-8 py-4 bg-[#EFB806] text-[#1A1A1A] font-bold text-base rounded-full shadow-lg shadow-[#EFB806]/30 hover:bg-[#E69D03] hover:shadow-[#EFB806]/50 transition-all duration-300">
                  
                  Shop Now
                  <motion.span animate={{
                  x: [0, 4, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}>
                    
                    <ArrowRightIcon size={18} />
                  </motion.span>
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button whileHover={{
                scale: 1.03
              }} whileTap={{
                scale: 0.97
              }} className="px-8 py-4 border border-[#EFB806]/40 text-[#EFB806] font-semibold text-base rounded-full hover:bg-[#EFB806]/10 transition-all duration-300">
                  
                  Our Story
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }} className="flex gap-8 mt-12 pt-8 border-t border-[#333333]">
              
              {[{
              value: '50+',
              label: 'Mango Varieties'
            }, {
              value: '10K+',
              label: 'Happy Customers'
            }, {
              value: '100%',
              label: 'Organic'
            }].map(stat => <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#EFB806]" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                    {stat.value}
                  </div>
                  <div className="text-[#F5F5F5]/50 text-sm">{stat.label}</div>
                </div>)}
            </motion.div>
          </motion.div>

          {/* Mango Image */}
          <div className="order-1 lg:order-2 flex justify-center items-center relative">
            {/* Glow behind mango */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#EFB806]/30 blur-3xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#D37E05]/25 blur-2xl" />
            </div>
            {/* Extra glow for premium effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-b from-[#EFB806]/10 via-transparent to-transparent blur-3xl opacity-60" />
            </div>

            <motion.div style={{
            y: mangoY
          }} animate={{
            y: [0, -24, 0],
            rotate: [0, 3, -1, 0]
          }} transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="relative z-10">
              
              <motion.div initial={{
              opacity: 0,
              scale: 0.7
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.8,
              delay: 0.3,
              ease: 'easeOut'
            }}>
                
                <img 
                  src="https://images.unsplash.com/photo-1599599810748-59203fe2c393?w=800&h=800&fit=crop&q=80" 
                  srcSet="https://images.unsplash.com/photo-1555631894-3f0ba1bfa0f1?w=400&h=400&fit=crop&q=80 400w, https://images.unsplash.com/photo-1599599810748-59203fe2c393?w=800&h=800&fit=crop&q=80 800w"
                  alt="Premium Sri Lankan Karthakolomban Mango" 
                  className="w-72 h-72 md:w-[420px] md:h-[420px] object-cover rounded-full mango-glow" 
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(239,184,6,0.4))',
                    boxShadow: '0 20px 60px rgba(239,184,6,0.3)'
                  }}
                  loading="eager"
                />
                
              </motion.div>

              {/* Floating badge */}
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 1
            }} className="absolute -right-4 top-8 glass rounded-2xl px-4 py-3 border border-[#EFB806]/20">
                
                <div className="text-[#EFB806] font-bold text-lg">4.9 ⭐</div>
                <div className="text-[#F5F5F5]/60 text-xs">234 Reviews</div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: -30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 1.2
            }} className="absolute -left-4 bottom-12 glass rounded-2xl px-4 py-3 border border-[#3B653D]/30">
                
                <div className="text-[#3B653D] font-bold text-sm">
                  🌿 100% Organic
                </div>
                <div className="text-[#F5F5F5]/60 text-xs">Certified Fresh</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.5
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        
        <span className="text-[#F5F5F5]/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div animate={{
        y: [0, 8, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }} className="w-5 h-8 border-2 border-[#EFB806]/30 rounded-full flex justify-center pt-1">
          
          <div className="w-1 h-2 bg-[#EFB806]/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>;
}