import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LeafIcon, AwardIcon, UsersIcon, MapPinIcon } from 'lucide-react';
const stats = [{
  value: '15+',
  label: 'Years of Excellence',
  icon: AwardIcon
}, {
  value: '200+',
  label: 'Partner Farms',
  icon: MapPinIcon
}, {
  value: '10K+',
  label: 'Happy Customers',
  icon: UsersIcon
}, {
  value: '100%',
  label: 'Certified Organic',
  icon: LeafIcon
}];
const values = [{
  title: 'Sustainability',
  description: 'We partner with farms that use eco-friendly practices, ensuring our mangoes are grown in harmony with nature.',
  emoji: '🌿'
}, {
  title: 'Authenticity',
  description: 'Every product is sourced directly from Sri Lankan orchards, preserving the authentic taste of Ceylon.',
  emoji: '🥭'
}, {
  title: 'Quality First',
  description: 'Rigorous quality checks at every stage — from harvest to delivery — ensure only the finest reach you.',
  emoji: '⭐'
}, {
  title: 'Community',
  description: 'We support local farming communities by providing fair wages and sustainable livelihoods.',
  emoji: '🤝'
}];
export function About() {
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,101,61,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(239,184,6,0.08)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -40
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7
          }}>
              
              <p className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-3">
                — Our Story
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-[#F5F5F5] mb-6 leading-tight" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                Born from the{' '}
                <span className="text-gradient-mango">Heart of Ceylon</span>
              </h1>
              <p className="text-[#AAAAAA] text-lg leading-relaxed mb-6">
                Ceylon Mango was founded with a simple dream: to share the
                extraordinary flavors of Sri Lanka's finest mangoes with the
                world. What began as a small family orchard in the lush hills of
                Kandy has grown into a premium mango brand trusted by thousands.
              </p>
              <p className="text-[#AAAAAA] leading-relaxed">
                For over 15 years, we've been cultivating relationships with the
                most dedicated mango farmers across Sri Lanka, ensuring every
                fruit that reaches your home carries the authentic taste of
                Ceylon.
              </p>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            x: 40
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }} className="relative">
              
              <div className="absolute inset-0 bg-[#EFB806]/20 blur-3xl rounded-full" />
              <img src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=500&fit=crop" alt="Ceylon Mango Farm" className="relative z-10 w-full h-80 object-cover rounded-3xl" />
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} className="bg-[#222222] rounded-2xl p-6 text-center border border-[#333333] hover:border-[#EFB806]/30 transition-colors">
              
                <stat.icon size={28} className="text-[#EFB806] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#EFB806] mb-1" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                  {stat.value}
                </div>
                <div className="text-[#AAAAAA] text-sm">{stat.label}</div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.7
          }}>
              
              <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=500&fit=crop" alt="Mango Orchard" className="w-full h-80 object-cover rounded-3xl" />
              
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            x: 40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }}>
              
              <p className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-3">
                — The Origin
              </p>
              <h2 className="text-4xl font-bold text-[#F5F5F5] mb-6" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                The Mango Capital of{' '}
                <span className="text-gradient-mango">Sri Lanka</span>
              </h2>
              <p className="text-[#AAAAAA] leading-relaxed mb-4">
                Sri Lanka's tropical climate — with its perfect balance of
                rainfall, sunshine, and rich volcanic soil — creates ideal
                conditions for growing some of the world's most flavorful
                mangoes. The island's mango varieties are renowned for their
                exceptional sweetness, vibrant color, and intoxicating aroma.
              </p>
              <p className="text-[#AAAAAA] leading-relaxed">
                Our orchards span the fertile regions of Jaffna, Kandy, and the
                North Central Province — each contributing unique flavor
                profiles that make Ceylon mangoes truly one-of-a-kind.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            
            <p className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-2">
              — What We Stand For
            </p>
            <h2 className="text-4xl font-bold text-[#F5F5F5]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Our <span className="text-gradient-mango">Values</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => <motion.div key={v.title} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.12
          }} whileHover={{
            y: -6
          }} className="bg-[#222222] rounded-2xl p-6 border border-[#333333] hover:border-[#EFB806]/30 transition-all duration-300">
              
                <span className="text-4xl mb-4 block">{v.emoji}</span>
                <h3 className="text-[#F5F5F5] font-bold text-lg mb-3" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                  {v.title}
                </h3>
                <p className="text-[#AAAAAA] text-sm leading-relaxed">
                  {v.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      <Footer />
    </div>;
}