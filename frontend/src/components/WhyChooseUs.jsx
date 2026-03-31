import React from 'react';
import { motion } from 'framer-motion';
import { LeafIcon, HandIcon, TruckIcon, AwardIcon } from 'lucide-react';
const features = [{
  icon: LeafIcon,
  title: 'Organic & Fresh',
  description: 'Every mango is grown without harmful pesticides or chemicals. Pure, natural, and certified organic.',
  color: '#3B653D'
}, {
  icon: HandIcon,
  title: 'Hand-Picked',
  description: 'Carefully selected at peak ripeness by experienced farmers who know exactly when each mango is perfect.',
  color: '#EFB806'
}, {
  icon: TruckIcon,
  title: 'Fast Delivery',
  description: 'From our orchards to your doorstep within 24-48 hours. Freshness guaranteed with cold-chain logistics.',
  color: '#D37E05'
}, {
  icon: AwardIcon,
  title: 'Premium Quality',
  description: 'Only the finest grade mangoes make it to our store. Rigorous quality checks ensure perfection every time.',
  color: '#E69D03'
}];
export function WhyChooseUs() {
  return <section className="py-20 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,101,61,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      }} className="text-center mb-14">
          
          <p className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-2">
            — Why Ceylon Mango
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F5]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            The Ceylon <span className="text-gradient-mango">Difference</span>
          </h2>
          <p className="mt-4 text-[#F5F5F5]/60 max-w-xl mx-auto">
            We're not just selling mangoes — we're delivering an experience
            rooted in tradition, quality, and passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => <motion.div key={feature.title} initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: '-60px'
        }} transition={{
          duration: 0.6,
          delay: i * 0.12
        }} whileHover={{
          y: -6
        }} className="group bg-[#222222] rounded-2xl p-6 border border-[#333333] hover:border-[#EFB806]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#EFB806]/5">
            
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{
            backgroundColor: `${feature.color}20`
          }}>
              
                <feature.icon size={26} style={{
              color: feature.color
            }} />
              
              </div>
              <h3 className="text-[#F5F5F5] font-bold text-lg mb-3" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
                {feature.title}
              </h3>
              <p className="text-[#AAAAAA] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}